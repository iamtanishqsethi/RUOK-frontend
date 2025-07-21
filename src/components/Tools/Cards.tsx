import type { TechniqueCard} from "@/utils/types";
import eftbefore from "@/assets/eft/eftbefore.png";
import anchorbefore from "@/assets/anchoring/anchorbefore.png";
import fourbefore from "@/assets/fourbreathe/fourbefore.png";
import balloonbefore from "@/assets/balloon/balloonbefore.png";
import bellybefore from "@/assets/bellybreathe/bellybefore.png";
import butterflybefore from "@/assets/butterfly/butterflybefore.png";
import groundingbefore from "@/assets/grounding/groundbefore.png";
import nervousbefore from "@/assets/nervous/nervousbefore.png";
import relaxbefore from "@/assets/relaxation/relaxbefore.png";
import squarebefore from "@/assets/squarebreathe/squarebefore.png";
import eftafter from "@/assets/eft/eftafter.png";
import anchorafter from "@/assets/anchoring/anchorafter.png";
import fourafter from "@/assets/fourbreathe/fourafter.png";
import balloonafter from "@/assets/balloon/balloonafter.png";
import bellyafter from "@/assets/bellybreathe/bellyafter.png";
import butterflyafter from "@/assets/butterfly/butterflyafter.png";
import groundingafter from "@/assets/grounding/groundafter.png";
import nervousafter from "@/assets/nervous/nervousafter.png";
import relaxafter from "@/assets/relaxation/relaxafter.png";
import squareafter from "@/assets/squarebreathe/squareafter.png";
import anchors1 from "@/assets/stepsanchor/1x/s1_1mdpi.png";
import anchors2 from "@/assets/stepsanchor/1x/s2_1mdpi.png";
import anchors3 from "@/assets/stepsanchor/1x/s3_1mdpi.png";
import anchors4 from "@/assets/stepsanchor/1x/s4_1mdpi.png";
import anchors5 from "@/assets/stepsanchor/1x/s5_1mdpi.png";
import anchors6 from "@/assets/stepsanchor/1x/s6mdpi.png";
import belly1 from "@/assets/stepsbelly/1x/s1_3mdpi.png";
import belly2 from "@/assets/stepsbelly/1x/s2_3mdpi.png";
import belly3 from "@/assets/stepsbelly/1x/s3_3mdpi.png";
import belly4 from "@/assets/stepsbelly/1x/s4_3mdpi.png";
import belly5 from "@/assets/stepsbelly/1x/s5_3mdpi.png";
import eft1 from "@/assets/stepseft/1x/s1 2_1mdpi.png";
import eft2 from "@/assets/stepseft/1x/s2 2mdpi.png";
import eft3 from "@/assets/stepseft/1x/s3 2mdpi.png";
import eft4 from "@/assets/stepseft/1x/s4 2mdpi.png";
import eft5 from "@/assets/stepseft/1x/s5 2mdpi.png";
import eft6 from "@/assets/stepseft/1x/Asset 19mdpi.png";
import muscle1 from "@/assets/stepsmuscle/1x/s1_2mdpi.png";
import muscle2 from "@/assets/stepsmuscle/1x/s2_2mdpi.png";
import muscle3 from "@/assets/stepsmuscle/1x/s3_2mdpi.png";
import muscle5 from "@/assets/stepsmuscle/1x/s4_2mdpi.png";
import muscle4 from "@/assets/stepsmuscle/1x/s5_2mdpi.png";
import ground1 from "@/assets/stepsgrounding/1x/s1mdpi.png";
import ground2 from "@/assets/stepsgrounding/1x/s2mdpi.png";
import ground3 from "@/assets/stepsgrounding/1x/s3mdpi.png";
import ground4 from "@/assets/stepsgrounding/1x/s4mdpi.png";
import ground5 from "@/assets/stepsgrounding/1x/s5mdpi.png";
import nervous1 from "@/assets/stepsnervous/1x/s1_1mdpi.png";
import nervous2 from "@/assets/stepsnervous/1x/s2_1mdpi.png";
import nervous3 from "@/assets/stepsnervous/1x/s3_1mdpi.png";
import nervous4 from "@/assets/stepsnervous/1x/s4_1mdpi.png";
import nervous5 from "@/assets/stepsnervous/1x/s5_1mdpi.png";
import nervous6 from "@/assets/stepsnervous/1x/s6_1mdpi.png";
import butterfly1 from "@/assets/stepsbutterfly/1x/s1_2mdpi.png";
import butterfly2 from "@/assets/stepsbutterfly/1x/s2_2mdpi.png";
import butterfly3 from "@/assets/stepsbutterfly/1x/s3 rightmdpi.png";
import butterfly4 from "@/assets/stepsbutterfly/1x/s4_2mdpi.png";
import butterfly5 from "@/assets/stepsbutterfly/1x/s5_2mdpi.png";
import balloon1 from "@/assets/stepsballoon/1x/s1mdpi.png";
import balloon2 from "@/assets/stepsballoon/1x/s2mdpi.png";
import balloon3 from "@/assets/stepsballoon/1x/s3mdpi.png";
import balloon4 from "@/assets/stepsballoon/1x/s4mdpi.png";
import balloon5 from "@/assets/stepsballoon/1x/s5mdpi.png";
import balloon6 from "@/assets/stepsballoon/1x/s6mdpi.png";

export const cards: TechniqueCard[] = [
    {
      title: "Emotional Freedom Technique",
      description: "",
      src: eftbefore,
      afterSrc: eftafter,
      category: "High Energy Unpleasant",
      steps: [
        {
          text: "Identify the issue you want to address (e.g. I feel anxious).",
          image: eft1,
        },
        {
          text: "Rate distress from 0–10.",
          image: eft2,
        },
        {
          text: "Tap the side of your hand while saying: Even though I feel __, I deeply and completely accept myself.",
          image: eft3,
        },
        {
          text: "Tap 5-7 times each- your eyebrow, side of eye, under eye, chin, collar bone, side of torso.",
          image: eft4,
        },
        {
          text: "Repeat a reminder phrase (This anxiety, This Stress, etc) while tapping each point.",
          image: eft5,
        },
        {
          text: "Take a deep breath, and then re-rate distress 0-10, repeat until distress is less than or 2.",
          image: eft6,
        },
      ],
    },
    {
      title: "4-7-8 Breathing",
      description: "",
      src: fourbefore,
      afterSrc: fourafter,
      category: "Low Energy Unpleasant",
      steps: [
        {
          text: "Exhale fully through your mouth, making a whoosh.",
          image: "/images/478breathing/step1.png",
        },
        {
          text: "Close your mouth and inhale quietly through your nose for a count of 4.",
          image: "/images/478breathing/step2.png",
        },
        {
          text: "Hold your breath for a count of 7.",
          image: "/images/478breathing/step3.png",
        },
        {
          text: "Exhale completely through your mouth for a count of 8.",
          image: "/images/478breathing/step4.png",
        },
        {
          text: "Repeat cycle up to 4 times.",
          image: "/images/478breathing/step5.png",
        },
      ],
    },
    {
      title: "Square (Box) Breathing",
      description: "",
      src: squarebefore,
      afterSrc: squareafter,
      category: "Low Energy Unpleasant",
      steps: [
        {
          text: "Imagine a box while doing this exercise to help focus your mind",
          image: "/images/478breathing/step1.png",
        },
        {
          text: "Inhale through your nose for 4 counts.",
          image: "/images/squarebreathing/step1.png",
        },
        {
          text: "Hold for 4 counts.",
          image: "/images/squarebreathing/step2.png",
        },
        {
          text: "Exhale through your mouth for 4 counts.",
          image: "/images/squarebreathing/step3.png",
        },
        {
          text: "Hold for 4 counts.",
          image: "/images/squarebreathing/step4.png",
        },
        {
          text: "Repeat for 4–6 cycles.",
          image: "/images/squarebreathing/step5.png",
        },
      ],
    },
    {
      title: "Grounding (5-4-3-2-1)",
      description: "",
      src: groundingbefore,
      afterSrc: groundingafter,
      category: "Low Energy Unpleasant",
      steps: [
        {
          text: "Identify 5 things you can see (e.g., a lamp, your hands).",
          image: ground1,
        },
        {
          text: "Identify 4 things you can touch (e.g., your chair, your foot).",
          image: ground2,
        },
        {
          text: "Identify 3 things you can hear (e.g., clock ticking, birds).",
          image: ground3,
        },
        {
          text: "Identify 2 things you can smell (or two you like).",
          image: ground4,
        },
        {
          text: "Identify 1 thing you can taste (or one you want).",
          image: ground5,
        },
      ],
    },
    {
      title: "Anchoring Happy Emotions",
      description: "",
      src: anchorbefore,
      afterSrc: anchorafter,
      category: "High Energy Pleasant",
      steps: [
        {
          text: "Recall a vivid positive memory.",
          image: anchors1,
        },
        {
          text: "Notice where you feel it in your body.",
          image: anchors2,
        },
        {
          text: "Apply pressure (e.g., pinch thumb and forefinger together).",
          image: anchors3,
        },
        {
          text: "Hold the happy feeling for 10–15 seconds.",
          image: anchors4,
        },
        {
          text: "Release the pinch and let feeling dissipate.",
          image: anchors5,
        },
        {
          text: "Repeat 3 times to anchor the positive state.",
          image: anchors6,
        },
      ],
    },
    {
      title: "Butterfly Hug",
      description: "",
      src: butterflybefore,
      afterSrc: butterflyafter,
      category: "Low Energy Pleasant",
      steps: [
        {
          text: "Cross your arms over your chest.",
          image: butterfly1
        },
        {
          text: "Place your hands on opposite upper arms.",
          image: butterfly2,
        },
        {
          text: "Alternately tap left then right shoulder gently.",
          image: butterfly3,
        },
        {
          text: "Breathe deeply and evenly.",
          image: butterfly4,
        },
        {
          text: "Continue for 1-2 minutes or until calm.",
          image: butterfly5,
        },
      ],
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "",
      src: relaxbefore,
      afterSrc: relaxafter,
      category: "Low Energy Pleasant",
      steps: [
        {
          text: "Find a quiet seat or lie down. Close eyes and inhale deeply.",
          image: muscle1,
        },
        {
          text: "Visualize golden light at your feet - feel warmth.",
          image: muscle2,
        },
        {
          text: "Scan upward: legs → hips → torso → arms → hands → neck → head.",
          image: muscle3,
        },
        {
          text: "At each area, tense muscles for 5 sec, then release, imagining golden light flooding and relaxing.",
          image: muscle4,
        },
        {
          text: "Finish with full-body glow, breathe slowly for 2 more breaths.",
          image: muscle5,
        },
      ],
    },
    {
      title: "Balloon Technique for Anger",
      description: "",
      src: balloonbefore,
      afterSrc: balloonafter,
      category: "High Energy Unpleasant",
      steps: [
        {
          text: "Sit comfortably and close eyes.",
          image: balloon1,
        },
        {
          text: "Inhale and gather your anger/sadness into your belly.",
          image: balloon2,
        },
        {
          text: "Visualize a balloon in front of you.",
          image: balloon3,
        },
        {
          text: "Blow the balloon with your breath, filling it with your emotion.",
          image: balloon4,
        },
        {
          text: "Tie the balloon's neck firmly.",
          image: balloon5,
        },
        {
          text: "Watch it float away until it's out of sight.",
          image: balloon6,
        },
        {
          text: "Breathe deeply and open your eyes.",
          image: balloon1,
        },
      ],
    },
    {
      title: "Nervous System Body Shakes",
      description: "",
      src: nervousbefore,
      afterSrc: nervousafter,
      category: "High Energy Unpleasant",
      steps: [
        {
          text: "Stand with feet hip-width apart.",
          image: nervous1,
        },
        {
          text: "Relax knees slightly.",
          image: nervous2,
        },
        {
          text: "Allow your body to shake or tremble gently.",
          image: nervous3,
        },
        {
          text: "Let the movement start from your feet, travel up legs, torso, arms.",
          image: nervous4,
        },
        {
          text: "Continue until shaking subsides (30 sec-2 min).",
          image: nervous5,
        },
        {
          text: "Stand still, notice how you feel.",
          image: nervous6,
        },
      ],
    },
    {
      title: "Belly Breathing",
      description: "",
      src: bellybefore,
      afterSrc: bellyafter,
      category: "Low Energy Pleasant",
      steps: [
        {
          text: "Lie on your back or sit upright.",
          image: belly1,
        },
        {
          text: "Place one hand on your chest, one on your belly.",
          image: belly2,
        },
        {
          text: "Inhale through nose, directing air into your belly - feel your hand rise.",
          image: belly3,
        },
        {
          text: "Exhale through pursed lips, feel belly fall.",
          image: belly4,
        },
        {
          text: "Repeat for 1–2 minutes, keeping chest still.",
          image: belly5,
        },
      ],
    },
  ];