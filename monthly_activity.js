function calculateMonthlyActiveUsers(userSessions) {
    var monthlyActivities = [];
    // Map to store active users for each month
    var activeUsersMap = new Map();
    // Iterate through user sessions
    userSessions.forEach(function (session) {
        var _a;
        var loggedInMonth = session.logged_in.toISOString().slice(0, 7);
        var loggedOutMonth = session.logged_out.toISOString().slice(0, 7);
        // Ensure user session spans at least 30 minutes
        var sessionDuration = session.logged_out.getTime() - session.logged_in.getTime();
        if (sessionDuration >= 30 * 60 * 1000) {
            if (!activeUsersMap.has(loggedInMonth)) {
                activeUsersMap.set(loggedInMonth, new Set());
            }
            (_a = activeUsersMap.get(loggedInMonth)) === null || _a === void 0 ? void 0 : _a.add(loggedOutMonth);
        }
    });
    // Convert map to array of MonthlyActivity objects
    activeUsersMap.forEach(function (activeUsers, month) {
        monthlyActivities.push({ month: month, activeUsers: activeUsers });
    });
    return monthlyActivities;
}
// Example usage
var userSessions = [
    { logged_in: new Date('2024-01-01T10:00:00'), logged_out: new Date('2024-01-01T10:30:00'), lastSeenAt: new Date() },
    { logged_in: new Date('2024-01-15T09:00:00'), logged_out: new Date('2024-01-15T09:45:00'), lastSeenAt: new Date() },
    { logged_in: new Date('2024-02-01T08:00:00'), logged_out: new Date('2024-02-01T08:45:00'), lastSeenAt: new Date() },
];
var monthlyActivity = calculateMonthlyActiveUsers(userSessions);
console.log(monthlyActivity);
