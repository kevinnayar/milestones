import { Request, Response } from 'express';
import { ServiceHandlerOpts, DBClient } from '../../types';
import { Logger, logReq } from '../../../shared/helpers/logger';

class MilestonesHandler {
  client: DBClient;
  log: Logger;

  constructor(opts: ServiceHandlerOpts) {
    const { client, log } = opts;
    this.client = client;
    this.log = log;
  }

  getData = async (req: Request, res: Response) => {
    this.log.info(logReq(req));
    // const milestones: Milestone[] = [
    //   {
    //     id: 'birth',
    //     name: 'Birth! 👶',
    //     description: 'Happy Birthday!',
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 0,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'smiles',
    //     name: 'Smiles 😊',
    //     description:
    //     "After two months of sleepless nights and round-the-clock soothing, you've seen plenty of your baby's tears. Maybe you've spotted a fleeting smile, but then again, it could have been gas. Now it's time for the real reward. By around 2 months of age, your baby will smile in response to you! The sound of your voice or the sight of your face is often all it takes to trigger your baby's irresistible grin.",
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 2,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'laughs',
    //     name: 'Laughs 😆',
    //     description:
    //     "If the frequent sound of your baby's crying has you on edge, take heart. By 4 months, you can look forward to another sound, possibly the sweetest you'll ever hear - your baby's laughter. The best part is how easily a baby laughs. Silly faces, tickling, and peek-a-boo are usually more than enough to set off lots of squeals and giggles.",
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 4,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'sleeps-all-night',
    //     name: 'Sleeps All Night 😴',
    //     description:
    //     'Like no other baby milestone, a full night of sleep becomes the Holy Grail for new parents. While it is unrealistic and unhealthy to expect a newborn to sleep all night, parents can rest assured that relief will come soon. By 4-6 months, most babies are capable of sleeping through the night.',
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 4,
    //         days: 0,
    //       },
    //       stop: {
    //         years: 0,
    //         months: 6,
    //         days: 0,
    //       },
    //     },
    //   },
    //   {
    //     id: 'sits-up',
    //     name: 'Sits up',
    //     description:
    //     "How different the world looks when you're not stuck on your belly! Around 5 or 6 months, most babies can sit up with support - either by resting on their hands in front of them or by leaning on pillows or furniture. Babies can usually sit alone steadily by 7-9 months.",
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 5,
    //         days: 0,
    //       },
    //       stop: {
    //         years: 0,
    //         months: 6,
    //         days: 0,
    //       },
    //     },
    //   },
    //   {
    //     id: 'crawls',
    //     name: 'Crawls',
    //     description:
    //     "If you have an 8-month-old, you may want to put your gym membership on hold. You're about to get plenty of exercise chasing your suddenly mobile baby around the house. By 9 months, most babies crawl using both hands and feet, though some babies never crawl, preferring to creep or wriggle instead. Crawling is not an essential baby milestone, and infants who choose to scoot or creep still tend to reach other milestones on schedule.",
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 9,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'waves-bye-bye',
    //     name: 'Waves "Bye-Bye" 👋',
    //     description:
    //     'Waving "bye-bye" is not just a cute trick - it is an actual expression of language. By 9 months most babies begin to make the link between sounds, gestures, and meaning. They understand that waving is connected to the phrase "bye-bye."',
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 9,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'eats-finger-food',
    //     name: 'Eats Finger Food',
    //     description:
    //     "Just when spoon-feeding begins to lose its luster, babies are ready to feed themselves. Between 9-12 months, babies develop better control over their hands and fingers, making it easier to grab small objects - like finger foods! Unfortunately, babies this age love to explore taste and texture, so food is not the only thing they'll try to pop into their mouths. Environmental safety should, therefore, become a big parental concern at this age.",
    //     range: {
    //       start: {
    //         years: 0,
    //         months: 9,
    //         days: 0,
    //       },
    //       stop: {
    //         years: 1,
    //         months: 0,
    //         days: 0,
    //       },
    //     },
    //   },
    //   {
    //     id: 'stands',
    //     name: 'Stands',
    //     description:
    //     'By 12 months, most babies begin to stand briefly without support. They also take small steps while holding onto furniture or other objects, an activity called "cruising." In the weeks or months before they walk independently, babies may spend hours cruising to practice for the real thing.',
    //     range: {
    //       start: {
    //         years: 1,
    //         months: 0,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'says-a-word',
    //     name: 'Says a Word',
    //     description:
    //     "\"Mama! Dada!\" There's nothing like hearing your baby call your name, and it usually happens right around the one-year mark. By this time, most babies can say at least one real word and actively try to imitate others. It won't be long before you finally get to hear what's on your little one's mind.",
    //     range: {
    //       start: {
    //         years: 1,
    //         months: 0,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    //   {
    //     id: 'takes-a-step',
    //     name: 'Takes a Step',
    //     description:
    //     "You might call it the crown jewel of baby milestones. Perhaps no other moment is met with more anticipation (or camera clicks) than a baby's first step on their own. But not all babies walk by their first birthday. The normal range is anywhere from 9 to 17 months, with most babies taking at least a few steps by about 13 months.",
    //     range: {
    //       start: {
    //         years: 1,
    //         months: 1,
    //         days: 0,
    //       },
    //       stop: null,
    //     },
    //   },
    // ];
    return res.status(200).json({ data: 'foo' });
  };
}

export function handler(opts: ServiceHandlerOpts) {
  const { app } = opts;
  const milestones = new MilestonesHandler(opts);

  app.get('/api/v1/milestones/data', milestones.getData);
}
