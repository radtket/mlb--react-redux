const Glossary = {
  pitch_types: [
    {
      id: "FA",
      type: "Fastball",
    },
    {
      id: "SI",
      type: "Sinker",
    },
    {
      id: "CT",
      type: "Cutter",
    },
    {
      id: "CU",
      type: "Curveball",
    },
    {
      id: "SL",
      type: "Slider",
    },
    {
      id: "CH",
      type: "Changeup",
    },
    {
      id: "KN",
      type: "Knuckleball",
    },
    {
      id: "SP",
      type: "Splitter",
    },
    {
      id: "SC",
      type: "Screwball",
    },
    {
      id: "FO",
      type: "Forkball",
    },
    {
      id: "IB",
      type: "Intentional Ball",
    },
    {
      id: "PI",
      type: "Pitchout",
    },
  ],
  player_statuses: [
    {
      id: "A",
      type: "activated",
    },
    {
      id: "ASG",
      type: "assigned",
    },
    {
      id: "BRV",
      type: "bereavement",
    },
    {
      id: "D10",
      type: "disabled list - 10 day",
    },
    {
      id: "D15",
      type: "disabled list - 15 day",
    },
    {
      id: "D60",
      type: "disabled list - 60 day",
    },
    {
      id: "D7",
      type: "disabled list - 7 day",
    },
    {
      id: "DES",
      type: "designated for assignment",
    },
    {
      id: "DFA",
      type: "designated for assignment",
    },
    {
      id: "FA",
      type: "free agent",
    },
    {
      id: "FME",
      type: "Family Medical Emergency",
    },
    {
      id: "LV",
      type: "Paid Leave",
    },
    {
      id: "MIN",
      type: "minors",
    },
    {
      id: "NRI",
      type: "Non-roster Invite",
    },
    {
      id: "OFS",
      type: "Out For Season",
    },
    {
      id: "OPT",
      type: "optioned",
    },
    {
      id: "OUT",
      type: "outrighted",
    },
    {
      id: "PL",
      type: "Paternity Leave",
    },
    {
      id: "REL",
      type: "released",
    },
    {
      id: "RET",
      type: "retired ",
    },
    {
      id: "RST",
      type: "restricted",
    },
    {
      id: "SGN",
      type: "signed",
    },
    {
      id: "SUS",
      type: "suspended",
    },
    {
      id: "UDP",
      type: "unsigned draft pick",
    },
    {
      id: "UNK",
      type: "unknown status",
    },
    {
      id: "USC",
      type: "unknown status change",
    },
    {
      id: "WV",
      type: "waivers",
    },
  ],
  pitch_outcomes: [
    {
      id: "aBK",
      desc: "Balk",
    },
    {
      id: "aCI",
      desc: "Catcher Interference",
    },
    {
      id: "aD",
      desc: "Double",
    },
    {
      id: "aDAD3",
      desc: "Double - Adv 3rd",
    },
    {
      id: "aDAD4",
      desc: "Double - Adv Home",
    },
    {
      id: "aFCAD2",
      desc: "Fielders Choice - Adv 2nd",
    },
    {
      id: "aFCAD3",
      desc: "Fielders Choice - Adv 3rd",
    },
    {
      id: "aFCAD4",
      desc: "Fielders Choice - Adv Home",
    },
    {
      id: "aHBP",
      desc: "Hit By Pitch",
    },
    {
      id: "aHR",
      desc: "Homerun",
    },
    {
      id: "aIBB",
      desc: "Intentional Walk",
    },
    {
      id: "aKLAD1",
      desc: "Strike Looking - Adv 1st",
    },
    {
      id: "aKLAD2",
      desc: "Strike Looking - Adv 2nd",
    },
    {
      id: "aKLAD3",
      desc: "Strike Looking - Adv 3rd",
    },
    {
      id: "aKLAD4",
      desc: "Strike Looking - Adv Home",
    },
    {
      id: "aKSAD1",
      desc: "Strike Swinging - Adv 1st",
    },
    {
      id: "aKSAD2",
      desc: "Strike Swinging - Adv 2nd",
    },
    {
      id: "aKSAD3",
      desc: "Strike Swinging - Adv 3rd",
    },
    {
      id: "aKSAD4",
      desc: "Strike Swinging - Adv Home",
    },
    {
      id: "aROE",
      desc: "Reached On Error",
    },
    {
      id: "aROEAD2",
      desc: "Reached On Error - Adv 2nd",
    },
    {
      id: "aROEAD3",
      desc: "Reached On Error - Adv 3rd",
    },
    {
      id: "aROEAD4",
      desc: "Reached On Error - Adv Home",
    },
    {
      id: "aS",
      desc: "Single",
    },
    {
      id: "aSAD2",
      desc: "Single - Adv 2nd",
    },
    {
      id: "aSAD3",
      desc: "Single - Adv 3rd",
    },
    {
      id: "aSAD4",
      desc: "Single - Adv Home",
    },
    {
      id: "aSBAD1",
      desc: "Sacrifice Bunt - Adv 1st",
    },
    {
      id: "aSBAD2",
      desc: "Sacrifice Bunt - Adv 2nd",
    },
    {
      id: "aSBAD3",
      desc: "Sacrifice Bunt - Adv 3rd",
    },
    {
      id: "aSBAD4",
      desc: "Sacrifice Bunt - Adv Home",
    },
    {
      id: "aSFAD1",
      desc: "Sacrifice Fly - Adv 1st",
    },
    {
      id: "aSFAD2",
      desc: "Sacrifice Fly - Adv 2nd",
    },
    {
      id: "aSFAD3",
      desc: "Sacrifice Fly - Adv 3rd",
    },
    {
      id: "aSFAD4",
      desc: "Sacrifice Fly - Adv Home",
    },
    {
      id: "aT",
      desc: "Triple",
    },
    {
      id: "aTAD4",
      desc: "Triple - Adv Home",
    },
    {
      id: "bAB",
      desc: "Enforced Ball",
    },
    {
      id: "bB",
      desc: "Ball",
    },
    {
      id: "bDB",
      desc: "Dirt Ball",
    },
    {
      id: "bIB",
      desc: "iBall",
    },
    {
      id: "bPO",
      desc: "Pitchout",
    },
    {
      id: "kF",
      desc: "Foul Ball",
    },
    {
      id: "kFT",
      desc: "Foul Tip",
    },
    {
      id: "kKL",
      desc: "Strike Looking",
    },
    {
      id: "kKS",
      desc: "Strike Swinging",
    },
    {
      id: "oBI",
      desc: "Batter Interference",
    },
    {
      id: "oDT3",
      desc: "Double - Out at 3rd",
    },
    {
      id: "oDT4",
      desc: "Double - Out at Home",
    },
    {
      id: "oFC",
      desc: "Fielders Choice",
    },
    {
      id: "oFCT2",
      desc: "Fielders Choice - Out at 2nd",
    },
    {
      id: "oFCT3",
      desc: "Fielders Choice - Out at 3rd",
    },
    {
      id: "oFCT4",
      desc: "Fielders Choice - Out at Home",
    },
    {
      id: "oFO",
      desc: "Fly Out",
    },
    {
      id: "oGO",
      desc: "Ground Out",
    },
    {
      id: "oKLT1",
      desc: "Strike Looking - Out at 1st",
    },
    {
      id: "oKLT2",
      desc: "Strike Looking - Out at 2nd",
    },
    {
      id: "oKLT3",
      desc: "Strike Looking - Out at 3rd",
    },
    {
      id: "oKLT4",
      desc: "Strike Looking - Out at Home",
    },
    {
      id: "oKST1",
      desc: "Strike Swinging - Out at 1st",
    },
    {
      id: "oKST2",
      desc: "Strike Swinging - Out at 2nd",
    },
    {
      id: "oKST3",
      desc: "Strike Swinging - Out at 3rd",
    },
    {
      id: "oKST4",
      desc: "Strike Swinging - Out at Home",
    },
    {
      id: "oLO",
      desc: "Line Out",
    },
    {
      id: "oOBB",
      desc: "Out of Batters Box",
    },
    {
      id: "oOP",
      desc: "Out on Appeal",
    },
    {
      id: "oPO",
      desc: "Pop Out",
    },
    {
      id: "oROET2",
      desc: "Reached On Error - Out at 2nd",
    },
    {
      id: "oROET3",
      desc: "Reached On Error - Out at 3rd",
    },
    {
      id: "oROET4",
      desc: "Reached On Error - Out at Home",
    },
    {
      id: "oSB",
      desc: "Sacrifice Bunt",
    },
    {
      id: "oSBT2",
      desc: "Sacrifice Bunt - Out at 2nd",
    },
    {
      id: "oSBT3",
      desc: "Sacrifice Bunt - Out at 3rd",
    },
    {
      id: "oSBT4",
      desc: "Sacrifice Bunt - Out at Home",
    },
    {
      id: "oSF",
      desc: "Sacrifice Fly",
    },
    {
      id: "oSFT2",
      desc: "Sacrifice Fly - Out at 2nd",
    },
    {
      id: "oSFT3",
      desc: "Sacrifice Fly - Out at 3rd",
    },
    {
      id: "oSFT4",
      desc: "Sacrifice Fly - Out at Home",
    },
    {
      id: "oST2",
      desc: "Single - Out at 2nd",
    },
    {
      id: "oST3",
      desc: "Single - Out at 3rd",
    },
    {
      id: "oST4",
      desc: "Single - Out at Home",
    },
    {
      id: "oTT4",
      desc: "Triple - Out at Home",
    },
  ],
  game_statuses: [
    {
      id: "scheduled",
      desc: "The game is on the schedule and ready to play",
      label: "Scheduled",
    },
    {
      id: "inprogress",
      desc: "The first pitch for the game has been received",
      label: "In Progress",
    },
    {
      id: "complete",
      desc:
        "The last pitch for the game has been received and statistics are being reviewed",
      label: "Complete",
    },
    {
      id: "closed",
      desc: "The game has passed review and MLB has officially closed the game",
      label: "Closed",
    },
    {
      id: "wdelay",
      desc: "The game has been delayed because of weather",
      label: "Weather Delay",
    },
    {
      id: "fdelay",
      desc: "The game has been delayed because of facility issues",
      label: "Facility Delay",
    },
    {
      id: "odelay",
      desc: "The game has been delayed",
      label: "Game Delay",
    },
    {
      id: "postponed",
      desc:
        "The game has been postponed and will be rescheduled in the future, restarting at the top of the 1st",
      label: "Postponed",
    },
    {
      id: "suspended",
      desc:
        "The game has been suspended and will be rescheduled in the future, continuing where they left off",
      label: "Suspended",
    },
    {
      id: "maintenance",
      desc: "The game failed review and is in the process of being repaired",
      label: "Maintenance",
    },
    {
      id: "canceled",
      desc: "The game has been canceled and will not be played.",
      label: "Canceled",
    },
    {
      id: "unnecessary",
      desc: "The game has been deemed unnecessary and will not be played.",
      label: "Unnecessary",
    },
    {
      id: "if-necessary",
      desc: "The game will be played if necessary.",
      label: "If Necessary",
    },
  ],
  runner_outcomes: [
    {
      id: "CK",
      desc: "Checked",
    },
    {
      id: "ERN",
      desc: "Earned Run/RBI",
    },
    {
      id: "eRN",
      desc: "Earned Run/No RBI",
    },
    {
      id: "URN",
      desc: "Unearned Run/RBI",
    },
    {
      id: "uRN",
      desc: "Unearned Run/No RBI",
    },
    {
      id: "PO",
      desc: "Pickoff",
    },
    {
      id: "POCS2",
      desc: "Pickoff/Caught Stealing 2nd",
    },
    {
      id: "POCS3",
      desc: "Pickoff/Caught Stealing 3rd",
    },
    {
      id: "POCS4",
      desc: "Pickoff/Caught Stealing Home",
    },
    {
      id: "AD1",
      desc: "Advance 1st",
    },
    {
      id: "AD2",
      desc: "Advance 2nd",
    },
    {
      id: "AD3",
      desc: "Advance 3rd",
    },
    {
      id: "SB2",
      desc: "Stole 2nd",
    },
    {
      id: "SB3",
      desc: "Stole 3rd",
    },
    {
      id: "SB4",
      desc: "Stole Home",
    },
    {
      id: "TO2",
      desc: "Tag out 2nd",
    },
    {
      id: "TO3",
      desc: "Tag out 3rd",
    },
    {
      id: "TO4",
      desc: "Tag out Home",
    },
    {
      id: "FO1",
      desc: "Force out 1st",
    },
    {
      id: "FO2",
      desc: "Force out 2nd",
    },
    {
      id: "FO3",
      desc: "Force out 3rd",
    },
    {
      id: "FO4",
      desc: "Force out Home",
    },
    {
      id: "CS2",
      desc: "Caught Stealing 2nd",
    },
    {
      id: "CS3",
      desc: "Caught Stealing 3rd",
    },
    {
      id: "CS4",
      desc: "Caught Stealing Home",
    },
    {
      id: "SB2E3",
      desc: "Stole 2nd, error to 3rd",
    },
    {
      id: "SB2E4",
      desc: "Stole 2nd, error to Home",
    },
    {
      id: "SB2E4E",
      desc: "Stole 2nd, error to Home",
    },
    {
      id: "SB3E4",
      desc: "Stole 3rd, error to Home",
    },
    {
      id: "SB3E4E",
      desc: "Stole 3rd, error to Home",
    },
    {
      id: "DI2",
      desc: "Indifference to 2nd",
    },
    {
      id: "DI3",
      desc: "Indifference to 3rd",
    },
    {
      id: "DO1",
      desc: "Doubled off 1st",
    },
    {
      id: "DO2",
      desc: "Doubled off 2nd",
    },
    {
      id: "DO3",
      desc: "Doubled off 3rd",
    },
    {
      id: "RI",
      desc: "Runner Interference",
    },
    {
      id: "OOA",
      desc: "Out on Appeal",
    },
    {
      id: "OBP",
      desc: "Out of Base Path",
    },
    {
      id: "HBB",
      desc: "Hit by Batted Ball",
    },
  ],
  post_season_games: [
    {
      id: "ALTB-1",
      desc: "AL Tiebreaker",
    },
    {
      id: "ALWC-1",
      desc: "AL Wild Card",
    },
    {
      id: "ALDS-1",
      desc: "AL Division Series - Game 1",
    },
    {
      id: "ALDS-2",
      desc: "AL Division Series - Game 2",
    },
    {
      id: "ALDS-3",
      desc: "AL Division Series - Game 3",
    },
    {
      id: "ALDS-4",
      desc: "AL Division Series - Game 4",
    },
    {
      id: "ALDS-5",
      desc: "AL Division Series - Game 5",
    },
    {
      id: "ALCS-1",
      desc: "AL Championship Series - Game 1",
    },
    {
      id: "ALCS-2",
      desc: "AL Championship Series - Game 2",
    },
    {
      id: "ALCS-3",
      desc: "AL Championship Series - Game 3",
    },
    {
      id: "ALCS-4",
      desc: "AL Championship Series - Game 4",
    },
    {
      id: "ALCS-5",
      desc: "AL Championship Series - Game 5",
    },
    {
      id: "ALCS-6",
      desc: "AL Championship Series - Game 6",
    },
    {
      id: "ALCS-7",
      desc: "AL Championship Series - Game 7",
    },
    {
      id: "NLTB-1",
      desc: "NL Tiebreaker",
    },
    {
      id: "NLWC-1",
      desc: "NL Wild Card",
    },
    {
      id: "NLDS-1",
      desc: "NL Division Series - Game 1",
    },
    {
      id: "NLDS-2",
      desc: "NL Division Series - Game 2",
    },
    {
      id: "NLDS-3",
      desc: "NL Division Series - Game 3",
    },
    {
      id: "NLDS-4",
      desc: "NL Division Series - Game 4",
    },
    {
      id: "NLDS-5",
      desc: "NL Division Series - Game 5",
    },
    {
      id: "NLCS-1",
      desc: "NL Championship Series - Game 1",
    },
    {
      id: "NLCS-2",
      desc: "NL Championship Series - Game 2",
    },
    {
      id: "NLCS-3",
      desc: "NL Championship Series - Game 3",
    },
    {
      id: "NLCS-4",
      desc: "NL Championship Series - Game 4",
    },
    {
      id: "NLCS-5",
      desc: "NL Championship Series - Game 5",
    },
    {
      id: "NLCS-6",
      desc: "NL Championship Series - Game 6",
    },
    {
      id: "NLCS-7",
      desc: "NL Championship Series - Game 7",
    },
    {
      id: "WS-1",
      desc: "World Series - Game 1",
    },
    {
      id: "WS-2",
      desc: "World Series - Game 2",
    },
    {
      id: "WS-3",
      desc: "World Series - Game 3",
    },
    {
      id: "WS-4",
      desc: "World Series - Game 4",
    },
    {
      id: "WS-5",
      desc: "World Series - Game 5",
    },
    {
      id: "WS-6",
      desc: "World Series - Game 6",
    },
    {
      id: "WS-7",
      desc: "World Series - Game 7",
    },
  ],
  player_positions: [
    {
      id: "1",
      desc: "Pitcher",
      label: "P",
    },
    {
      id: "2",
      desc: "Catcher",
      label: "C",
    },
    {
      id: "3",
      desc: "1st Base",
      label: "1B",
    },
    {
      id: "4",
      desc: "2nd Base",
      label: "2B",
    },
    {
      id: "5",
      desc: "3rd Base",
      label: "3B",
    },
    {
      id: "6",
      desc: "Shortstop",
      label: "SS",
    },
    {
      id: "7",
      desc: "Left Field",
      label: "LF",
    },
    {
      id: "8",
      desc: "Center Field",
      label: "CF",
    },
    {
      id: "9",
      desc: "Right Field",
      label: "RF",
    },
    {
      id: "10",
      desc: "Designated Hitter",
      label: "DH",
    },
    {
      id: "11",
      desc: "Pinch Hitter",
      label: "PH",
    },
    {
      id: "12",
      desc: "Pinch Runner",
      label: "PR",
    },
  ],
};

export default Glossary;
