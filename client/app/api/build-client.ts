import axios from 'axios';

export default function buildClient(sessionValue: string) {
  if (sessionValue) {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: {
        Host: 'ticket.local',
        Cookie: `session=${sessionValue}`, 
      }
    })
  }
  return null;
}