import {
  TrackTemplate,
  EntityMilestone,
} from '../types/entityTypes';

const milestonesChildV1: EntityMilestone[] = [
  {
    id: 'birth',
    name: 'Birth! 👶',
    description: 'Happy Birthday!',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'smiles',
    name: 'Smiles 😊',
    description:
      "After two months of sleepless nights and round-the-clock soothing, you've seen plenty of your baby's tears. Maybe you've spotted a fleeting smile, but then again, it could have been gas. Now it's time for the real reward. By around 2 months of age, your baby will smile in response to you! The sound of your voice or the sight of your face is often all it takes to trigger your baby's irresistible grin.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 2,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'laughs',
    name: 'Laughs 😆',
    description:
      "If the frequent sound of your baby's crying has you on edge, take heart. By 4 months, you can look forward to another sound, possibly the sweetest you'll ever hear - your baby's laughter. The best part is how easily a baby laughs. Silly faces, tickling, and peek-a-boo are usually more than enough to set off lots of squeals and giggles.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 4,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'sleeps-all-night',
    name: 'Sleeps All Night 😴',
    description:
      'Like no other baby milestone, a full night of sleep becomes the Holy Grail for new parents. While it is unrealistic and unhealthy to expect a newborn to sleep all night, parents can rest assured that relief will come soon. By 4-6 months, most babies are capable of sleeping through the night.',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 4,
          days: 0,
        },
        stop: {
          years: 0,
          months: 6,
          days: 0,
        },
      },
    },
  },
  {
    id: 'sits-up',
    name: 'Sits up',
    description:
      "How different the world looks when you're not stuck on your belly! Around 5 or 6 months, most babies can sit up with support - either by resting on their hands in front of them or by leaning on pillows or furniture. Babies can usually sit alone steadily by 7-9 months.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 5,
          days: 0,
        },
        stop: {
          years: 0,
          months: 6,
          days: 0,
        },
      },
    },
  },
  {
    id: 'crawls',
    name: 'Crawls',
    description:
      "If you have an 8-month-old, you may want to put your gym membership on hold. You're about to get plenty of exercise chasing your suddenly mobile baby around the house. By 9 months, most babies crawl using both hands and feet, though some babies never crawl, preferring to creep or wriggle instead. Crawling is not an essential baby milestone, and infants who choose to scoot or creep still tend to reach other milestones on schedule.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 9,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'waves-bye-bye',
    name: 'Waves "Bye-Bye" 👋',
    description:
      'Waving "bye-bye" is not just a cute trick - it is an actual expression of language. By 9 months most babies begin to make the link between sounds, gestures, and meaning. They understand that waving is connected to the phrase "bye-bye."',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 9,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'eats-finger-food',
    name: 'Eats Finger Food',
    description:
      "Just when spoon-feeding begins to lose its luster, babies are ready to feed themselves. Between 9-12 months, babies develop better control over their hands and fingers, making it easier to grab small objects - like finger foods! Unfortunately, babies this age love to explore taste and texture, so food is not the only thing they'll try to pop into their mouths. Environmental safety should, therefore, become a big parental concern at this age.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 9,
          days: 0,
        },
        stop: {
          years: 1,
          months: 0,
          days: 0,
        },
      },
    },
  },
  {
    id: 'stands',
    name: 'Stands',
    description:
      'By 12 months, most babies begin to stand briefly without support. They also take small steps while holding onto furniture or other objects, an activity called "cruising." In the weeks or months before they walk independently, babies may spend hours cruising to practice for the real thing.',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 1,
          months: 0,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'says-a-word',
    name: 'Says a Word',
    description:
      "\"Mama! Dada!\" There's nothing like hearing your baby call your name, and it usually happens right around the one-year mark. By this time, most babies can say at least one real word and actively try to imitate others. It won't be long before you finally get to hear what's on your little one's mind.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 1,
          months: 0,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'takes-a-step',
    name: 'Takes a Step',
    description:
      "You might call it the crown jewel of baby milestones. Perhaps no other moment is met with more anticipation (or camera clicks) than a baby's first step on their own. But not all babies walk by their first birthday. The normal range is anywhere from 9 to 17 months, with most babies taking at least a few steps by about 13 months.",
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 1,
          months: 1,
          days: 0,
        },
        stop: null,
      },
    },
  },
];

// https://www.parents.com/baby/development/growth/baby-development-week-by-week/
const milestonesChildV2: EntityMilestone[] = [
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 1,
        },
        stop: null,
      },
    },
    name: 'Week 1',
    id: 'week-1',
    description:
      "It's only been a week, but your newborn already knows they can rely on you. By now, they can recognize your voice, and the familiarity helps them adjust to the strange new world outside the womb. They can't understand your words, but talk to them often as an expression of love and comfort. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 2,
        },
        stop: null,
      },
    },
    name: 'Week 2',
    id: 'week-2',
    description:
      'In their second week of life, your baby can focus on objects 8 to 14 inches away—about the distance between their eyes and yours during nursing. As you feed your little one, move your head slowly from side to side and see if their eyes follow you. This helps build their eye muscles and tracking skills.',
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 3,
        },
        stop: null,
      },
    },
    name: 'Week 3',
    id: 'week-3',
    description:
      'Though their movements are still random and jerky, your baby can start snuggling by week three. As you hold them, watch how they adjust their posture towards you. They find your arms and even your scent calming and comforting. ',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 4,
        },
        stop: null,
      },
    },
    name: 'Week 4',
    id: 'week-4',
    description:
      'Have you noticed your baby using their vocal chords in ways other than crying? They may coo and make "ahh" sounds this week, especially when they see mom or dad. Babies learn by mimicking, so replay their sounds back to them to promote newborn developmental milestones.',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 5,
        },
        stop: null,
      },
    },
    name: 'Week 5',
    id: 'week-5',
    description:
      'This week, your baby\'s movements become smoother and more purposeful, and those random jerky motions begin to disappear. Set aside time each day for using their body—for example, you can give them a gentle mini-workout by slowly pulling them to a sitting position, or let them "fly" by resting them tummy-down on your forearm. Always support their head during movements.',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 6,
        },
        stop: null,
      },
    },
    name: 'Week 6',
    id: 'week-6',
    description:
      "At this age, your baby will flash an adorable gummy grin that's their first genuine smile. How can you tell? Their eyes will brighten and widen as they move their mouth upwards. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 7,
        },
        stop: null,
      },
    },
    name: 'Week 7',
    id: 'week-7',
    description:
      "As another infant milestone, your baby will start understanding senses; they can look at a rattle and connect it to the sound it makes. They're also becoming partial to color, preferring bright hues and three-dimensional objects over flat black and white ones.",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 8,
        },
        stop: null,
      },
    },
    name: 'Week 8',
    id: 'week-8',
    description:
      "While your little one's head is still wobbly, those neck muscles are getting stronger by the day. In fact, your baby can probably lift their head about 45 degrees. Put them on their stomach for brief periods every day so they can practice. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 9,
        },
        stop: null,
      },
    },
    name: 'Week 9',
    id: 'week-9',
    description:
      'Sounds fascinate your baby, especially high tones and pitches. They\'re also interested in hearing you talk, and will stare intently at your mouth as you speak to them. They may even reply with cooing or "goo"-ing. ',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 10,
        },
        stop: null,
      },
    },
    name: 'Week 10',
    id: 'week-10',
    description:
      "Around week 10, your baby can pick out their parents' faces in a group. When someone familiar comes near, they might respond with wide eyes and gleeful wiggling. They're ready to hone their social skills, so include them in family activities—for example, bring them to the table during dinner, or put them in a carrier sling while you work. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 11,
        },
        stop: null,
      },
    },
    name: 'Week 11',
    id: 'week-11',
    description:
      "Your baby stays awake for longer periods of time now. They're anxious to learn about the world, and they may not always be interested in your choice of game. If they turn their head and look away, they're ready to move onto something else. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 12,
        },
        stop: null,
      },
    },
    name: 'Week 12',
    id: 'week-12',
    description:
      "At this fun baby stage, your little one has discovered an endless source of enchantment: their hands. They've realized that those fingers and thumbs are separate objects. They can also bring their hands together, look at them, then put them to their mouth to taste. Let them experiment with these wonderful tools by offering different textures for them to feel, such as a velvet scarf or a rubbery toy. ",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 13,
        },
        stop: null,
      },
    },
    name: 'Week 13',
    id: 'week-13',
    description:
      'Besides bestowing sweet smiles and coos on you, your baby may be laughing, chuckling, and babbling in long chains. These baby development milestones are absolutely adorable!',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 14,
        },
        stop: null,
      },
    },
    name: 'Week 14',
    id: 'week-14',
    description:
      "Rattles and dangling toys do more than amuse your baby at 14 weeks; they also develop their hand and eye skills. Your infant is also intrigued by multi-textured toys, bright primary colors, and things that make sounds. They'll bat or grasp them (they'll also try to put them in their mouth!)",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 15,
        },
        stop: null,
      },
    },
    name: 'Week 15',
    id: 'week-15',
    description:
      "Say good-bye to a relatively stationary baby. Around week 15, your little one may start rolling over—either from back-to-front or front-to-back. In the coming weeks, they'll likely master rolls in one direction. As a safety precaution, make sure they're never left alone on a bed or high surface. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 16,
        },
        stop: null,
      },
    },
    name: 'Week 16',
    id: 'week-16',
    description:
      "Your little one is getting stronger by the day. They may protest when placed on their stomach, but they need tummy time every day for exercising their neck, chest, rib cage, and arm muscles. These muscle groups are necessary for rolling over, sitting up, and crawling. Join them on the floor and talk outside of their range of vision. They'll be distracted from fussing for a few minutes while they're busy looking for you!",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 17,
        },
        stop: null,
      },
    },
    name: 'Week 17',
    id: 'week-17',
    description:
      "Your baby probably entertains everyone (including themselves) by making razzing noises or blowing raspberries. They'll laugh when you tickle their belly, and they'll mimic your words by making similar sounds. Boost both their ego and speech skills by chatting and making eye contact with them whenever possible.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 18,
        },
        stop: null,
      },
    },
    name: 'Week 18',
    id: 'week-18',
    description:
      "Around this point in your baby development timeline, you may be pleasantly surprised to find them peacefully playing alone. Their eyesight is sharp now, and their depth perception is also improving. They're very busy using their eyes and hands in play to learn about themselves. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 19,
        },
        stop: null,
      },
    },
    name: 'Week 19',
    id: 'week-19',
    description:
      "Your baby's dad claims that he distinctly heard \"daa daa.\" But, at 19 weeks, your baby doesn't mean anything by those sounds; they're simply putting consonants together with vowels. You can help them connect sounds with meanings by labeling things: point to pictures in their books, and touch their eyes, nose, and mouth while naming them. Before long, they'll be calling you both by name!",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 20,
        },
        stop: null,
      },
    },
    name: 'Week 20',
    id: 'week-20',
    description:
      "By now, your baby knows exactly who you are, and they're even starting to know themselves. They smile when seeing their reflection in a mirror and begin displaying some distinct personality traits. By watching their face, you'll probably be able to detect how they express different emotions, too.",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 21,
        },
        stop: null,
      },
    },
    name: 'Week 21',
    id: 'week-21',
    description:
      'Your baby is on the go as they reach five months. They may creep around the floor and turn their direction to get a new view. Put them on the floor or in a playpen and let them entertain themselves (while keeping a close eye, of course!) ',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 22,
        },
        stop: null,
      },
    },
    name: 'Week 22',
    id: 'week-22',
    description:
      "This week, your baby's favorite experiment is putting everything into their mouth. They're also conducting some new tests, like dropping toys to the ground and comparing the different sounds they make.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 23,
        },
        stop: null,
      },
    },
    name: 'Week 23',
    id: 'week-23',
    description:
      "Infants develop muscle coordination from the head down. At this time, they've likely acquired strength in their upper body, but their legs and torso are ready for a challenge. Some ways to help them progress: gently pull them to a standing position on your lap and bounce, or pull them to a sitting position on the floor.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 24,
        },
        stop: null,
      },
    },
    name: 'Week 24',
    id: 'week-24',
    description:
      'Your little one is already storing memories. Thanks to this infant developmental milestone, they recognize names, basic words like "no" and "bye-bye," and familiar sounds. They look when you point out objects and they may also point at things when you name them. ',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 25,
        },
        stop: null,
      },
    },
    name: 'Week 25',
    id: 'week-25',
    description:
      'Some of the biggest baby milestones—sitting, crawling, walking—occur at vastly different rates over the next several months. Your baby may be more steady when trying to sit, but probably still needs help. Prop them up with a few pillows to cushion any falls.',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 26,
        },
        stop: null,
      },
    },
    name: 'Week 26',
    id: 'week-26',
    description:
      'Your baby\'s still a charmer, but they may be more selective about giving out smiles to strangers. They may even be afraid to be away from you. To help soothe their anxieties and make your partings less sorrowful, try leaving shortly after a feeding. Stick to your schedule and establish a "goodbye" routine to give them a sense of security.',
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 27,
        },
        stop: null,
      },
    },
    name: 'Week 27',
    id: 'week-27',
    description:
      'You may have noticed your baby dropping things on the floor. This action teaches them about cause and effect. When they get the response they expect, it reinforces their understanding of how the world works.',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 28,
        },
        stop: null,
      },
    },
    name: 'Week 28',
    id: 'week-28',
    description:
      "By week 28, your baby is using their hands in more sophisticated ways—they may clap or imitate wiping off their food tray. They may be ready to start feeding themselves, too, so arm them with soft finger foods (be sure they aren't choking hazards).",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 29,
        },
        stop: null,
      },
    },
    name: 'Week 29',
    id: 'week-29',
    description:
      "While they're not ready to host dinner parties, your baby is eager for some more sophisticated ways of socializing. They're fond of peek-a-boo and other group games.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 30,
        },
        stop: null,
      },
    },
    name: 'Week 30',
    id: 'week-30',
    description:
      'If they haven\'t already started to crawl, your baby is busy mastering the muscular coordination and strength necessary for this feat. Their first attempts may be "creeping" (propelling themselves on their belly). Next, they may push up on their hands and knees and rock. Give them lots of time to practice and loads of encouragement.',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 31,
        },
        stop: null,
      },
    },
    name: 'Week 31',
    id: 'week-31',
    description:
      'Your baby\'s hands have likely evolved from little paws to little tools. Instead of clumsily grabbing things, they\'re learning how to manipulate their thumb and forefinger to pick up and hold objects. This "pincer grasp" will develop more in the next several weeks. Be extra vigilant about keeping choking hazards off the floor and away from their curious fingers.',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 32,
        },
        stop: null,
      },
    },
    name: 'Week 32',
    id: 'week-32',
    description:
      "Though they're still too young for pulling themselves up, your child may be able to lean against furniture with their hands free. To encourage this baby milestone, you can soften their falls by placing rugs or blankets underneath.",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 33,
        },
        stop: null,
      },
    },
    name: 'Week 33',
    id: 'week-33',
    description:
      "Your little person has their own opinions now, and they'll be sure to let you know what they do and don't like. Though it might be unnerving, bear in mind that they're experimenting with emotions and learning how to control their environment.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 34,
        },
        stop: null,
      },
    },
    name: 'Week 34',
    id: 'week-34',
    description:
      "If you're tracking baby development by week, you've probably noticed they've gained more coordination and strength in their legs and feet. They may have finally figured out how to pull themselves up to standing position. Encourage them to stand by placing a favorite toy on the seat of a sturdy chair. Point to the chair, tell them the toy is there, and cheer for them to get up and grab it.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 35,
        },
        stop: null,
      },
    },
    name: 'Week 35',
    id: 'week-35',
    description:
      'Your baby strings syllables together and places different consonants with vowels. They may comprehend common words like "ball" and "bottle." Satisfy their thirst for knowledge by reading lots of baby books and labeling things. They\'re taking in every word!',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 36,
        },
        stop: null,
      },
    },
    name: 'Week 36',
    id: 'week-36',
    description:
      "At around eight or nine months, a baby can create memories from their experiences. They might look at a ball, remember how it moves, then push it. They're even able to set goals for themselves, like making noise from a pan by crawling to it and banging it with a spoon. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 37,
        },
        stop: null,
      },
    },
    name: 'Week 37',
    id: 'week-37',
    description:
      "If you haven't already, look around the house and put dangerous objects safely out of your baby's reach. Their curiosity is boundless and their mobility gets them around further and faster. ",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 38,
        },
        stop: null,
      },
    },
    name: 'Week 38',
    id: 'week-38',
    description:
      "Around 38 weeks, your baby will leave a trail wherever they go. As they scoot around the house, they may pull books off shelves and clear cabinets of their contents. They'll also happily tip over wastebaskets. Though it's tiring for you to constantly clean up after them, this inquisitiveness is a natural part of baby development.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 39,
        },
        stop: null,
      },
    },
    name: 'Week 39',
    id: 'week-39',
    description:
      "If it seems that your baby is always sticking something into their mouth, you're probably right. Babies between the ages of 8 to 12 months spend at least 20 percent of their waking hours either gumming, turning over, or banging small objects. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 40,
        },
        stop: null,
      },
    },
    name: 'Week 40',
    id: 'week-40',
    description:
      "As you go about your day doing seemingly mundane tasks, your baby is intently watching you. They're also starting to imitate you. If given the chance, they might take a toothbrush and run it across their teeth, or try combing their hair. Mimicking is an important way for your baby to learn. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 41,
        },
        stop: null,
      },
    },
    name: 'Week 41',
    id: 'week-41',
    description:
      "You may have spent the past three nights rereading Goodnight Moon at your baby's insistence. They focus on each page and feel comforted by seeing the same images and hearing the same words over and over. Don't fight their requests; this is building self-esteem. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 42,
        },
        stop: null,
      },
    },
    name: 'Week 42',
    id: 'week-42',
    description:
      "Your baby is constantly discovering new and faster ways to move. They're likely cruising while holding furniture and may even be making a few wobbly unassisted steps. The more time they get to practice using their legs, the stronger and more coordinated they'll be.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 43,
        },
        stop: null,
      },
    },
    name: 'Week 43',
    id: 'week-43',
    description:
      "Out of sight, but not out of mind—your baby now knows that objects exist even when they can't see them. They'll look under blankets for a misplaced book, or play games by dropping a toy in a container, then turning it upside down. You can reinforce this concept of object permanence by playing a rudimentary game of hide and seek. Hide a toy under a cup and let them find it.",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 44,
        },
        stop: null,
      },
    },
    name: 'Week 44',
    id: 'week-44',
    description:
      "Your baby has discovered that there's more to the world than what meets the eye on ground level. The allure of stairs and furniture is irresistible, so be sure you've installed safety gates for this baby stage!",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 45,
        },
        stop: null,
      },
    },
    name: 'Week 45',
    id: 'week-45',
    description:
      'By now, your baby prefers feeding themselves and might even grab the spoon from you during mealtimes. This practice helps them master fine motor skills. ',
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 46,
        },
        stop: null,
      },
    },
    name: 'Week 46',
    id: 'week-46',
    description:
      "Your baby's personality is really blossoming now. They're developing their own opinions and aren't shy about expressing their preferences for people and activities. If diaper changes are becoming wrestling matches, keep in mind that they're flexing their newfound independence—a positive step in development.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 47,
        },
        stop: null,
      },
    },
    name: 'Week 47',
    id: 'week-47',
    description:
      "To limit accidents for your increasingly mobile baby, lay down the laws of the land. Though it's important for them to learn by exploration, they also need some limits and boundaries. Do this by giving simple directions and demonstrations: We walk to the sidewalk, then stop. You'll notice big improvements in baby development week by week!",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 48,
        },
        stop: null,
      },
    },
    name: 'Week 48',
    id: 'week-48',
    description:
      "Your baby may or may not be walking yet, but they're certainly trying to get around. They cruise on furniture, hold your hands while taking steps, and may not even want to sit down. This is a major milestone, though babies may take that first unassisted step at anywhere from 8 to 15 months. You can help their walking skills by giving them a sturdy push-pull toy, and placing furniture in strategic areas to encourage their cruising.",
  },

  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 49,
        },
        stop: null,
      },
    },
    name: 'Week 49',
    id: 'week-49',
    description:
      "There's a flip side to your baby's newfound independence: insecurity. They realize that by doing things on their own, they're a separate entity from you. Their anxiety around strangers may have returned, too. Reassure them by staying close when they need you, and giving them attention when they turn to you for it.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 50,
        },
        stop: null,
      },
    },
    name: 'Week 50',
    id: 'week-50',
    description:
      "You may be ready to collapse at the end of the day, but your baby is too excited by their new accomplishments to sleep. During their last feeding, hold them in your arms in a darkened room and gently rock them while singing. By establishing a relaxing bedtime ritual, they'll soon be able to expect and appreciate the break from their intense day.",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 51,
        },
        stop: null,
      },
    },
    name: 'Week 51',
    id: 'week-51',
    description:
      "Your baby is learning just how much they can handle. They've discovered they can hang onto an item in each hand and tuck one under their arm to pick up a third. ",
  },
  {
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 7 * 52,
        },
        stop: null,
      },
    },
    name: 'Week 52',
    id: 'week-52',
    description:
      "Happy birthday to Baby! While you're reveling in the accomplishments and changes your baby has made since entering your lives last year, they may give you a present of their own: Calling their parents mama or dada. They're on the brink of using more words, too, so encourage their interest in language by speaking slowly and clearly. You're preparing her for a lifetime of learning.",
  },
];

const milestonesPetV1: EntityMilestone[] = [
  {
    id: 'birth',
    name: 'Birth! 🐶 🐱',
    description: 'Happy Birthday!',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 0,
          days: 0,
        },
        stop: null,
      },
    },
  },
  {
    id: 'house-training',
    name: 'House Training',
    description:
      'With consistent house training your pup shouldn’t be having accidents in the house once they’re two to three months old.',
    ranges: {
      absolute: null,
      completed: null,
      relative: {
        start: {
          years: 0,
          months: 1,
          days: 0,
        },
        stop: {
          years: 0,
          months: 3,
          days: 0,
        },
      },
    },
  },
];

type StaticTrackState = {
  // eslint-disable-next-line no-unused-vars
  [key in TrackTemplate]: {
    [versionKey: string]: EntityMilestone[];
  };
};

const STATIC_TRACK_STATE: StaticTrackState = {
  CHILD_MILESTONES: {
    v1: milestonesChildV1,
    v2: milestonesChildV2,
  },
  PET_MILESTONES: {
    v1: milestonesPetV1,
  },
  CUSTOM_MILESTONES: {
    v1: [],
  },
};

export function getMilestonesForTemplate(
  template: TrackTemplate,
  version: number,
): EntityMilestone[] {
  const byTemplate = STATIC_TRACK_STATE[template];
  if (!byTemplate) throw new Error(`Unsupported track state for template: '${template}'`);

  const byVersion = byTemplate[`v${version}`];
  if (!byVersion) {
    throw new Error(
      `Unsupported track state for template: '${template}' and version: '${version}'`,
    );
  }

  return byVersion;
}


