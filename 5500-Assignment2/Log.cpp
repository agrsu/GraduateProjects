// CPSC 5500 - Atomic Transactions: log 

#include "Log.h"

Log::Log()
{
	pthread_mutex_init(&logLock, NULL);
}

bool Log::doesLogExist()
{
	ifstream logFile("LOG");
	bool logExists = logFile.good();
	logFile.close();
	return logExists;
}

void Log::clearLog()
{
	remove("LOG");
}

void Log::begin(int threadId, int transactionId, int globalTransactionId)
{
	lockLog();
	writeToLog("BEGIN " + to_string(globalTransactionId) + " " + to_string(threadId) + " " + to_string(transactionId));
	unlockLog();
}

void Log::update(int transactionId, int location, int currentValue, int value)
{
	lockLog();
	writeToLog("UPDATE " + to_string(transactionId) + " " + to_string(location) + " " + to_string(currentValue) + " " + to_string(value));
	unlockLog();
}

void Log::commit(int transactionId)
{
	lockLog();
	writeToLog("COMMITTED " + to_string(transactionId));
	unlockLog();
}

void Log::abort(int transactionId)
{
	lockLog();
	writeToLog("ABORTED " + to_string(transactionId));
	unlockLog();
}

void Log::neverFinish(int transactionId)
{
	lockLog();
	writeToLog("NEVER_FINISHED " + to_string(transactionId));
	unlockLog();
}

int Log::getGlobalTransactionNumber()
{
	int globalTransactionNumber = 0;
	ifstream logFile("LOG");
	string line;

	while (getline(logFile, line))
	{
		string buffer;
		stringstream ss(line);
		vector<string> logItems;

		while (ss >> buffer)
			logItems.push_back(buffer);

		if (logItems[0].compare("BEGIN") == 0)
		{
			globalTransactionNumber = stoi(logItems[1].c_str());
		}
	}
	logFile.close();

	return globalTransactionNumber;
}

void Log::lockLog()
{
	pthread_mutex_lock(&logLock);
}

void Log::unlockLog()
{
	pthread_mutex_unlock(&logLock);
}

void Log::writeToLog(string message)
{
	ofstream logFile;
	logFile.open("LOG", ios::app);
	if (!logFile.is_open())
	{
		cerr << "Unable to create or open log file!" << endl;
		exit(-1);
	}
	logFile << message + "\n";
	logFile.close();
}

void Log::