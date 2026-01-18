export interface ISession {
    sessionId:         number;
    batchId:           number;
    topicName:         string;
    topicDescription:  string;
    youtubeVideoId:    string;
    durationInMinutes: number;
    sessionDate:       Date;
    displayOrder:      number;
    createdAt:         Date;
    updatedAt:         Date;
}
