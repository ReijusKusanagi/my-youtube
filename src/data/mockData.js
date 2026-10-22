// Rich mock dataset representing educational, university CS, and popular tech/entertainment YouTube content
export const CATEGORIES = [
  "All",
  "Computer Science",
  "JavaScript",
  "React",
  "Web Development",
  "Algorithms",
  "Artificial Intelligence",
  "University Lectures",
  "Data Structures",
  "Cybersecurity",
  "Podcasts",
  "Gaming",
  "Music",
  "Recently Uploaded",
  "Watched"
];

export const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "Harvard CS50 - Full Computer Science University Course 2026",
    description: "Welcome to CS50x, Harvard University's introduction to the intellectual enterprises of computer science and the art of programming for majors and non-majors alike, with or without prior programming experience.\n\nTopics include:\n- Algorithms & Complexity\n- Data Structures in C & Python\n- Memory Allocation & Pointers\n- Web Development with Flask & React\n- SQL Databases\n\nInstructor: David J. Malan",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1280&q=80",
    duration: "2:41:18",
    durationSec: 9678,
    views: "4.8M",
    rawViews: 4812900,
    timestamp: "3 weeks ago",
    category: "Computer Science",
    channel: {
      id: "ch-cs50",
      name: "CS50 University",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      subscribers: "1.92M",
      verified: true
    },
    likes: "184K",
    likesCount: 184200,
    commentsCount: 3410,
    tags: ["#Harvard", "#ComputerScience", "#CS50", "#Programming"],
    comments: [
      {
        id: "c1",
        author: "Alex Rivera (CS Soph.)",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        timestamp: "5 days ago",
        text: "Professor Malan's explanation of pointers and memory allocation literally saved my Midterm exam in the lab yesterday!",
        likes: 421,
        replies: [
          {
            id: "r1",
            author: "Sarah Chen (Lab Teaching Assistant)",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
            timestamp: "3 days ago",
            text: "Glad it helped! Remember lab hours are open every Tuesday and Thursday at Lab Room 304.",
            likes: 89
          }
        ]
      },
      {
        id: "c2",
        author: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
        timestamp: "1 week ago",
        text: "The production quality of this lecture is insane. True gold standard of computer science education.",
        likes: 1205,
        replies: []
      }
    ]
  },
  {
    id: "v2",
    title: "React 19 in 100 Seconds: Everything You Need to Know",
    description: "React 19 is officially here! Learn about the compiler, Actions, useActionState, useOptimistic, Server Components, and the end of useMemo/useCallback.\n\nResources and code snippets available in our lab github repository.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1280&q=80",
    duration: "2:15",
    durationSec: 135,
    views: "1.2M",
    rawViews: 1245000,
    timestamp: "2 days ago",
    category: "React",
    channel: {
      id: "ch-fireship",
      name: "Fireship Tech",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      subscribers: "3.28M",
      verified: true
    },
    likes: "94K",
    likesCount: 94500,
    commentsCount: 1820,
    tags: ["#React", "#JavaScript", "#WebDev", "#Frontend"],
    comments: [
      {
        id: "c3",
        author: "DevLab Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        timestamp: "1 day ago",
        text: "Finally no more writing useMemo and useCallback everywhere! React 19 compiler is pure magic.",
        likes: 712,
        replies: []
      }
    ]
  },
  {
    id: "v3",
    title: "MIT 6.006: Introduction to Algorithms, Fall Term Lecture 1",
    description: "Lecture 1: Algorithmic Thinking, Peak Finding, Asymptotic Notation (Big O, Big Omega, Theta). MIT OpenCourseWare.\n\nFree course materials available online. Instructor: Prof. Srini Devadas.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1280&q=80",
    duration: "52:14",
    durationSec: 3134,
    views: "3.1M",
    rawViews: 3105000,
    timestamp: "5 months ago",
    category: "Algorithms",
    channel: {
      id: "ch-mit",
      name: "MIT OpenCourseWare",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80",
      subscribers: "5.14M",
      verified: true
    },
    likes: "135K",
    likesCount: 135400,
    commentsCount: 2940,
    tags: ["#MIT", "#Algorithms", "#BigO", "#DataStructures"],
    comments: [
      {
        id: "c4",
        author: "Algorithm Enjoyer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        timestamp: "2 months ago",
        text: "Peak finding in 1D and 2D arrays explained in 50 minutes better than a whole semester at my local college.",
        likes: 840,
        replies: []
      }
    ]
  },
  {
    id: "v4",
    title: "Building Modern Fullstack Apps with Vite, React & Node.js",
    description: "Complete hands-on masterclass for university students and developers building modern web apps. We cover Vite bundling, React hooks, state management, REST API endpoints, Tailwind styling, and deployment.\n\nRepository: github.com/student-lab/modern-web-stack",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1280&q=80",
    duration: "45:30",
    durationSec: 2730,
    views: "680K",
    rawViews: 680200,
    timestamp: "1 week ago",
    category: "Web Development",
    channel: {
      id: "ch-webdev",
      name: "Web Dev Simplified",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      subscribers: "1.58M",
      verified: true
    },
    likes: "45K",
    likesCount: 45200,
    commentsCount: 890,
    tags: ["#WebDev", "#Vite", "#React", "#JavaScript"],
    comments: [
      {
        id: "c5",
        author: "Junior Dev 2026",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
        timestamp: "4 days ago",
        text: "Vite is so lightning fast compared to create-react-app. HMR updates in milliseconds!",
        likes: 312,
        replies: []
      }
    ]
  },
  {
    id: "v5",
    title: "How Neural Networks Actually Work - Deep Learning Visualized",
    description: "A complete visual and mathematical walkthrough of neural networks, backpropagation, gradient descent, loss functions, and activation layers with interactive 3D visualizations.\n\nChapters:\n0:00 - Introduction\n2:14 - Neurons & Weights\n6:40 - Matrix Multiplications\n14:15 - Backpropagation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1280&q=80",
    duration: "28:15",
    durationSec: 1695,
    views: "2.4M",
    rawViews: 2410000,
    timestamp: "2 weeks ago",
    category: "Artificial Intelligence",
    channel: {
      id: "ch-3blue1brown",
      name: "3Blue1Brown Mathematics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      subscribers: "6.4M",
      verified: true
    },
    likes: "192K",
    likesCount: 192000,
    commentsCount: 4120,
    tags: ["#AI", "#DeepLearning", "#Math", "#NeuralNetworks"],
    comments: []
  },
  {
    id: "v6",
    title: "JavaScript Pro Tips - Code Like a Senior Engineer in 2026",
    description: "15 advanced JavaScript features that will instantly elevate your code quality, including StructuredClone, Top-Level Await, Array grouping (Object.groupBy), Pipeline operators, and Nullish coalescing best practices.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1280&q=80",
    duration: "18:42",
    durationSec: 1122,
    views: "890K",
    rawViews: 890400,
    timestamp: "4 days ago",
    category: "JavaScript",
    channel: {
      id: "ch-fireship",
      name: "Fireship Tech",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      subscribers: "3.28M",
      verified: true
    },
    likes: "58K",
    likesCount: 58900,
    commentsCount: 1120,
    tags: ["#JavaScript", "#ESNext", "#CleanCode", "#Coding"],
    comments: []
  },
  {
    id: "v7",
    title: "University Cyber Defense Lab: How Ethical Hackers Break In",
    description: "In this live cybersecurity lab session, our student security team demonstrates network penetration testing, buffer overflows, and defensive mitigation in a simulated campus enterprise environment.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1280&q=80",
    duration: "34:10",
    durationSec: 2050,
    views: "520K",
    rawViews: 520000,
    timestamp: "6 days ago",
    category: "Cybersecurity",
    channel: {
      id: "ch-cybersec",
      name: "CyberLab University",
      avatar: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=120&q=80",
      subscribers: "840K",
      verified: true
    },
    likes: "31K",
    likesCount: 31000,
    commentsCount: 640,
    tags: ["#Cybersecurity", "#EthicalHacking", "#Lab", "#InfoSec"],
    comments: []
  },
  {
    id: "v8",
    title: "Stanford CS229: Machine Learning Course by Andrew Ng",
    description: "Comprehensive university lecture series covering Supervised Learning, Unsupervised Learning, Support Vector Machines, Neural Networks, and Reinforcement Learning.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1280&q=80",
    duration: "1:15:32",
    durationSec: 4532,
    views: "1.8M",
    rawViews: 1840000,
    timestamp: "8 months ago",
    category: "University Lectures",
    channel: {
      id: "ch-stanford",
      name: "Stanford Online",
      avatar: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=120&q=80",
      subscribers: "2.1M",
      verified: true
    },
    likes: "89K",
    likesCount: 89000,
    commentsCount: 1620,
    tags: ["#Stanford", "#MachineLearning", "#AndrewNg", "#DataScience"],
    comments: []
  },
  {
    id: "v9",
    title: "Lo-Fi Beats to Code / Study to in the Computer Lab ☕ 24/7 Live Stream",
    description: "Chill melodic beats and soothing ambient sounds perfect for late-night programming sessions, exam cramming, and university lab assignments.\n\nCurated by the Campus Audio Engineering Guild.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1280&q=80",
    duration: "LIVE",
    durationSec: 0,
    isLive: true,
    views: "14.2K watching",
    rawViews: 852000,
    timestamp: "Started streaming 3 hours ago",
    category: "Music",
    channel: {
      id: "ch-lofi",
      name: "Lofi Coding Radio",
      avatar: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=120&q=80",
      subscribers: "9.8M",
      verified: true
    },
    likes: "210K",
    likesCount: 210000,
    commentsCount: 5200,
    tags: ["#Lofi", "#ChillBeats", "#StudyMusic", "#Coding"],
    comments: []
  },
  {
    id: "v10",
    title: "Building an Unreal Engine 5 Physics Sandbox in C++",
    description: "Watch as we engineer custom rigid body simulations, fluid particle dynamics, and destruction physics in Unreal Engine 5 from scratch in the game development university studio.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1280&q=80",
    duration: "22:04",
    durationSec: 1324,
    views: "340K",
    rawViews: 340000,
    timestamp: "3 days ago",
    category: "Gaming",
    channel: {
      id: "ch-gamedev",
      name: "Game Engine Dev",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80",
      subscribers: "420K",
      verified: false
    },
    likes: "24K",
    likesCount: 24000,
    commentsCount: 430,
    tags: ["#Gaming", "#UnrealEngine5", "#Cpp", "#GameDev"],
    comments: []
  },
  {
    id: "v11",
    title: "Lex Fridman Podcast #420 - The Future of Computing & Artificial Consciousness",
    description: "Deep technical and philosophical discussion on neuromorphic architectures, quantum computing supremacy, quantum error correction, and the path to artificial general intelligence.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1280&q=80",
    duration: "3:12:45",
    durationSec: 11565,
    views: "1.5M",
    rawViews: 1530000,
    timestamp: "1 week ago",
    category: "Podcasts",
    channel: {
      id: "ch-lex",
      name: "Lex Fridman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      subscribers: "4.3M",
      verified: true
    },
    likes: "78K",
    likesCount: 78000,
    commentsCount: 3900,
    tags: ["#Podcast", "#LexFridman", "#AI", "#TechPhilosophy"],
    comments: []
  },
  {
    id: "v12",
    title: "Data Structures Crash Course: Trees, Graphs & Hash Maps Mastered",
    description: "From Binary Search Trees to Red-Black Trees, Dijkstra's algorithm, BFS, DFS, and Hash Collision strategies with live animations and university lab exercises.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1280&q=80",
    duration: "1:34:12",
    durationSec: 5652,
    views: "980K",
    rawViews: 980000,
    timestamp: "2 weeks ago",
    category: "Data Structures",
    channel: {
      id: "ch-cs50",
      name: "CS50 University",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      subscribers: "1.92M",
      verified: true
    },
    likes: "67K",
    likesCount: 67000,
    commentsCount: 1290,
    tags: ["#DataStructures", "#Algorithms", "#CSPrep", "#Interview"],
    comments: []
  }
];

export const MOCK_SHORTS = [
  {
    id: "s1",
    title: "Did you know this JavaScript console trick? 🤯 #coding #tips",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    channel: {
      name: "Fireship Tech",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      subscribers: "3.28M"
    },
    likes: "420K",
    comments: "3.4K",
    sound: "Original Sound - Fireship Tech"
  },
  {
    id: "s2",
    title: "Why Senior Devs NEVER write nested IF statements 💀",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    channel: {
      name: "Web Dev Simplified",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      subscribers: "1.58M"
    },
    likes: "612K",
    comments: "5.1K",
    sound: "Lofi Coding Beats - Study Guild"
  },
  {
    id: "s3",
    title: "Recursion explained in 15 seconds! 🌀 Computer Science Lab",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    channel: {
      name: "CS50 University",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      subscribers: "1.92M"
    },
    likes: "890K",
    comments: "8.2K",
    sound: "CS50 Theme Audio"
  }
];

export const SUBSCRIPTIONS = [
  {
    id: "ch-cs50",
    name: "CS50 University",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    hasNew: true
  },
  {
    id: "ch-fireship",
    name: "Fireship Tech",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    hasNew: true
  },
  {
    id: "ch-mit",
    name: "MIT OpenCourseWare",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80",
    hasNew: false
  },
  {
    id: "ch-webdev",
    name: "Web Dev Simplified",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    hasNew: true
  },
  {
    id: "ch-3blue1brown",
    name: "3Blue1Brown Mathematics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    hasNew: false
  },
  {
    id: "ch-lex",
    name: "Lex Fridman",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    hasNew: false
  }
];

export const NOTIFICATIONS = [
  {
    id: "n1",
    title: "CS50 University uploaded: Harvard CS50 Lecture 9 - Web & Security",
    time: "2 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80",
    unread: true
  },
  {
    id: "n2",
    title: "Fireship Tech: React 19 is officially here! (100 seconds)",
    time: "1 day ago",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=120&q=80",
    unread: true
  },
  {
    id: "n3",
    title: "Lab Assistant Announcement: Midterm Project Review scheduled in Lab 304",
    time: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80",
    unread: false
  }
];

export const SEARCH_SUGGESTIONS = [
  "harvard cs50 2026",
  "react 19 tutorial for beginners",
  "data structures and algorithms in javascript",
  "mit opencourseware machine learning",
  "vite react tailwind setup guide",
  "computer lab project ideas",
  "lofi coding beats radio live",
  "unreal engine 5 c++ beginner"
];
