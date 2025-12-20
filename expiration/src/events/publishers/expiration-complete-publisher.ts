import { Subjects, Publisher, ExpirationCompleteEvent } from '@apkmstickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}