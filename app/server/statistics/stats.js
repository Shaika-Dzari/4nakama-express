const UPDATE_STATS_MESSAGE_TOTAL_COUNT = "update statistics set (value) = (select count(*) from message) where tablename = 'message' and statistic = 'total_count'";
const UPDATE_STATS_FILE_TOTAL_COUNT = "update statistics set (value) = (select count(*) from file) where tablename = 'file' and statistic = 'total_count'";
const UPDATE_STATS_COMMENT_TOTAL_COUNT = "update statistics set (value) = (select count(*) from comment) where tablename = 'comment' and statistic = 'total_count'";
const ALL_STATS = "select * from statistics";

module.exports = {
    UPDATE_STATS_MESSAGE_TOTAL_COUNT: UPDATE_STATS_MESSAGE_TOTAL_COUNT,
    UPDATE_STATS_FILE_TOTAL_COUNT: UPDATE_STATS_FILE_TOTAL_COUNT,
    UPDATE_STATS_COMMENT_TOTAL_COUNT: UPDATE_STATS_COMMENT_TOTAL_COUNT,
    ALL_STATS: ALL_STATS
};
