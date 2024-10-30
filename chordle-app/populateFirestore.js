const admin = require("firebase-admin");
const serviceAccount = require("./chordle-44664-firebase-adminsdk-c9pl8-7345402460.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

const chordsData = [
  // Major Triads
  {
    name: "C Major",
    notes: {
      note1: {
        note: "C",
        displayedNote: "C",
      },
      note2: {
        note: "E",
        displayedNote: "E",
      },
      note3: {
        note: "G",
        displayedNote: "G",
      },
    },
  },
  {
    name: "C#/Db Major",
    notes: {
      note1: {
        note: "C#",
        displayedNote: "C#",
      },
      note2: {
        note: "F",
        displayedNote: "F",
      },
      note3: {
        note: "G#",
        displayedNote: "G#",
      },
    },
  },
  {
    name: "D Major",
    notes: {
      note1: {
        note: "D",
        displayedNote: "D",
      },
      note2: {
        note: "F#",
        displayedNote: "F#",
      },
      note3: {
        note: "A",
        displayedNote: "A",
      },
    },
  },
  {
    name: "D#/Eb Major",
    notes: {
      note1: {
        note: "D#",
        displayedNote: "D#",
      },
      note2: {
        note: "G",
        displayedNote: "G",
      },
      note3: {
        note: "A#",
        displayedNote: "A#",
      },
    },
  },
  {
    name: "E Major",
    notes: {
      note1: {
        note: "E",
        displayedNote: "E",
      },
      note2: {
        note: "G#",
        displayedNote: "G#",
      },
      note3: {
        note: "B",
        displayedNote: "B",
      },
    },
  },
  {
    name: "F Major",
    notes: {
      note1: {
        note: "F",
        displayedNote: "F",
      },
      note2: {
        note: "A",
        displayedNote: "A",
      },
      note3: {
        note: "C",
        displayedNote: "C",
      },
    },
  },
  {
    name: "F#/Gb Major",
    notes: {
      note1: {
        note: "F#",
        displayedNote: "F#",
      },
      note2: {
        note: "A#",
        displayedNote: "A#",
      },
      note3: {
        note: "C#",
        displayedNote: "C#",
      },
    },
  },
  {
    name: "G Major",
    notes: {
      note1: {
        note: "G",
        displayedNote: "G",
      },
      note2: {
        note: "B",
        displayedNote: "B",
      },
      note3: {
        note: "D",
        displayedNote: "D",
      },
    },
  },
  {
    name: "G#/Ab Major",
    notes: {
      note1: {
        note: "G#",
        displayedNote: "G#",
      },
      note2: {
        note: "C",
        displayedNote: "C",
      },
      note3: {
        note: "D#",
        displayedNote: "D#",
      },
    },
  },
  {
    name: "A Major",
    notes: {
      note1: {
        note: "A",
        displayedNote: "A",
      },
      note2: {
        note: "C#",
        displayedNote: "C#",
      },
      note3: {
        note: "E",
        displayedNote: "E",
      },
    },
  },
  {
    name: "A#/Bb Major",
    notes: {
      note1: {
        note: "A#",
        displayedNote: "A#",
      },
      note2: {
        note: "D",
        displayedNote: "D",
      },
      note3: {
        note: "F",
        displayedNote: "F",
      },
    },
  },
  {
    name: "B Major",
    notes: {
      note1: {
        note: "B",
        displayedNote: "B",
      },
      note2: {
        note: "D#",
        displayedNote: "D#",
      },
      note3: {
        note: "F#",
        displayedNote: "F#",
      },
    },
  },
  
  // Minor Triads
  {
    name: "C Minor",
    notes: {
      note1: {
        note: "C",
        displayedNote: "C",
      },
      note2: {
        note: "D#",
        displayedNote: "Eb",
      },
      note3: {
        note: "G",
        displayedNote: "G",
      },
    },
  },
  {
    name: "C#/Db Minor",
    notes: {
      note1: {
        note: "C#",
        displayedNote: "C#",
      },
      note2: {
        note: "E",
        displayedNote: "E",
      },
      note3: {
        note: "G#",
        displayedNote: "G#",
      },
    },
  },
  {
    name: "D Minor",
    notes: {
      note1: {
        note: "D",
        displayedNote: "D",
      },
      note2: {
        note: "F",
        displayedNote: "F",
      },
      note3: {
        note: "A",
        displayedNote: "A",
      },
    },
  },
  {
    name: "D#/Eb Minor",
    notes: {
      note1: {
        note: "D#",
        displayedNote: "D#",
      },
      note2: {
        note: "F#",
        displayedNote: "F#",
      },
      note3: {
        note: "A#",
        displayedNote: "A#",
      },
    },
  },
  {
    name: "E Minor",
    notes: {
      note1: {
        note: "E",
        displayedNote: "E",
      },
      note2: {
        note: "G",
        displayedNote: "G",
      },
      note3: {
        note: "B",
        displayedNote: "B",
      },
    },
  },
  {
    name: "F Minor",
    notes: {
      note1: {
        note: "F",
        displayedNote: "F",
      },
      note2: {
        note: "G#",
        displayedNote: "Ab",
      },
      note3: {
        note: "C",
        displayedNote: "C",
      },
    },
  },
  {
    name: "F#/Gb Minor",
    notes: {
      note1: {
        note: "F#",
        displayedNote: "F#",
      },
      note2: {
        note: "A",
        displayedNote: "A",
      },
      note3: {
        note: "C#",
        displayedNote: "C#",
      },
    },
  },
  {
    name: "G Minor",
    notes: {
      note1: {
        note: "G",
        displayedNote: "G",
      },
      note2: {
        note: "A#",
        displayedNote: "Bb",
      },
      note3: {
        note: "D",
        displayedNote: "D",
      },
    },
  },
  {
    name: "G#/Ab Minor",
    notes: {
      note1: {
        note: "G#",
        displayedNote: "G#",
      },
      note2: {
        note: "B",
        displayedNote: "B",
      },
      note3: {
        note: "D#",
        displayedNote: "D#",
      },
    },
  },
  {
    name: "A Minor",
    notes: {
      note1: {
        note: "A",
        displayedNote: "A",
      },
      note2: {
        note: "C",
        displayedNote: "C",
      },
      note3: {
        note: "E",
        displayedNote: "E",
      },
    },
  },
  {
    name: "A#/Bb Minor",
    notes: {
      note1: {
        note: "A#",
        displayedNote: "A#",
      },
      note2: {
        note: "C#",
        displayedNote: "C#",
      },
      note3: {
        note: "F",
        displayedNote: "F",
      },
    },
  },
  {
    name: "B Minor",
    notes: {
      note1: {
        note: "B",
        displayedNote: "B",
      },
      note2: {
        note: "D",
        displayedNote: "D",
      },
      note3: {
        note: "F#",
        displayedNote: "F#",
      },
    },
  },
  
  // Diminished Triads
  {
    name: "C Diminished",
    notes: {
      note1: {
        note: "C",
        displayedNote: "C",
      },
      note2: {
        note: "D#",
        displayedNote: "Eb",
      },
      note3: {
        note: "F#",
        displayedNote: "Gb",
      },
    },
  },
  {
    name: "C#/Db Diminished",
    notes: {
      note1: {
        note: "C#",
        displayedNote: "C#",
      },
      note2: {
        note: "E",
        displayedNote: "E",
      },
      note3: {
        note: "G",
        displayedNote: "G",
      },
    },
  },
  {
    name: "D Diminished",
    notes: {
      note1: {
        note: "D",
        displayedNote: "D",
      },
      note2: {
        note: "F",
        displayedNote: "F",
      },
      note3: {
        note: "G#",
        displayedNote: "Ab",
      },
    },
  },
  {
    name: "D#/Eb Diminished",
    notes: {
      note1: {
        note: "D#",
        displayedNote: "D#",
      },
      note2: {
        note: "F#",
        displayedNote: "F#",
      },
      note3: {
        note: "A",
        displayedNote: "A",
      },
    },
  },
  {
    name: "E Diminished",
    notes: {
      note1: {
        note: "E",
        displayedNote: "E",
      },
      note2: {
        note: "G",
        displayedNote: "G",
      },
      note3: {
        note: "A#",
        displayedNote: "Bb",
      },
    },
  },
  {
    name: "F Diminished",
    notes: {
      note1: {
        note: "F",
        displayedNote: "F",
      },
      note2: {
        note: "G#",
        displayedNote: "Ab",
      },
      note3: {
        note: "B",
        displayedNote: "B",
      },
    },
  },
  {
    name: "F#/Gb Diminished",
    notes: {
      note1: {
        note: "F#",
        displayedNote: "F#",
      },
      note2: {
        note: "A",
        displayedNote: "A",
      },
      note3: {
        note: "C",
        displayedNote: "C",
      },
    },
  },
  {
    name: "G Diminished",
    notes: {
      note1: {
        note: "G",
        displayedNote: "G",
      },
      note2: {
        note: "A#",
        displayedNote: "Bb",
      },
      note3: {
        note: "C#",
        displayedNote: "Db",
      },
    },
  },
  {
    name: "G#/Ab Diminished",
    notes: {
      note1: {
        note: "G#",
        displayedNote: "G#",
      },
      note2: {
        note: "B",
        displayedNote: "B",
      },
      note3: {
        note: "D",
        displayedNote: "D",
      },
    },
  },
  {
    name: "A Diminished",
    notes: {
      note1: {
        note: "A",
        displayedNote: "A",
      },
      note2: {
        note: "C",
        displayedNote: "C",
      },
      note3: {
        note: "D#",
        displayedNote: "Eb",
      },
    },
  },
  {
    name: "A#/Bb Diminished",
    notes: {
      note1: {
        note: "A#",
        displayedNote: "A#",
      },
      note2: {
        note: "C#",
        displayedNote: "C#",
      },
      note3: {
        note: "E",
        displayedNote: "E",
      },
    },
  },
  {
    name: "B Diminished",
    notes: {
      note1: {
        note: "B",
        displayedNote: "B",
      },
      note2: {
        note: "D",
        displayedNote: "D",
      },
      note3: {
        note: "F",
        displayedNote: "F",
      },
    },
  },
  // Augmented Triads
  {
    name: "C Augmented",
    notes: {
      note1: {
        note: "C",
        displayedNote: "C",
      },
      note2: {
        note: "E",
        displayedNote: "E",
      },
      note3: {
        note: "G#",
        displayedNote: "G#",
      },
    },
  },
  {
    name: "C#/Db Augmented",
    notes: {
      note1: {
        note: "C#",
        displayedNote: "C#",
      },
      note2: {
        note: "F",
        displayedNote: "F",
      },
      note3: {
        note: "A",
        displayedNote: "A",
      },
    },
  },
  {
    name: "D Augmented",
    notes: {
      note1: {
        note: "D",
        displayedNote: "D",
      },
      note2: {
        note: "F#",
        displayedNote: "F#",
      },
      note3: {
        note: "A#",
        displayedNote: "A#",
      },
    },
  },

  {
    name: "D#/Eb Augmented",
    notes: {
      note1: {
        note: "D#",
        displayedNote: "D#",
      },
      note2: {
        note: "G",
        displayedNote: "G",
      },
      note3: {
        note: "B",
        displayedNote: "B",
      },
    },
  },
  {
    name: "E Augmented",
    notes: {
      note1: {
        note: "E",
        displayedNote: "E",
      },
      note2: {
        note: "G#",
        displayedNote: "G#",
      },
      note3: {
        note: "C",
        displayedNote: "C",
      },
    },
  },
  {
    name: "F Augmented",
    notes: {
      note1: {
        note: "F",
        displayedNote: "F",
      },
      note2: {
        note: "A",
        displayedNote: "A",
      },
      note3: {
        note: "C#",
        displayedNote: "C#",
      },
    },
  },
  {
    name: "F#/Gb Augmented",
    notes: {
      note1: {
        note: "F#",
        displayedNote: "F#",
      },
      note2: {
        note: "A#",
        displayedNote: "A#",
      },
      note3: {
        note: "D",
        displayedNote: "D",
      },
    },
  },
  {
    name: "G Augmented",
    notes: {
      note1: {
        note: "G",
        displayedNote: "G",
      },
      note2: {
        note: "B",
        displayedNote: "B",
      },
      note3: {
        note: "D#",
        displayedNote: "D#",
      },
    },
  },
  {
    name: "G#/Ab Augmented",
    notes: {
      note1: {
        note: "G#",
        displayedNote: "G#",
      },
      note2: {
        note: "C",
        displayedNote: "C",
      },
      note3: {
        note: "D#",
        displayedNote: "Eb",
      },
    },
  },
  {
    name: "A Augmented",
    notes: {
      note1: {
        note: "A",
        displayedNote: "A",
      },
      note2: {
        note: "C#",
        displayedNote: "C#",
      },
      note3: {
        note: "F",
        displayedNote: "F",
      },
    },
  },
  {
    name: "A#/Bb Augmented",
    notes: {
      note1: {
        note: "A#",
        displayedNote: "A#",
      },
      note2: {
        note: "D",
        displayedNote: "D",
      },
      note3: {
        note: "F#",
        displayedNote: "F#",
      },
    },
  },
  {
    name: "B Augmented",
    notes: {
      note1: {
        note: "B",
        displayedNote: "B",
      },
      note2: {
        note: "D#",
        displayedNote: "D#",
      },
      note3: {
        note: "G",
        displayedNote: "G",
      },
    },
  },
];


const addChordsToFirestore = async () => {
  const chordsCollection = firestore.collection("chords");

  for (const chord of chordsData) {
    await chordsCollection.add(chord);
    console.log(`Added chord: ${chord.name}`);
  }
};

addChordsToFirestore()
  .then(() => {
    console.log("Chords added to Firestore successfully.");
  })
  .catch((error) => {
    console.error("Error adding chords to Firestore:", error);
  });
