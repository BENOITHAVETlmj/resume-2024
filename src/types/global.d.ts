export interface Data {
    profile: {
      personalInfos: {
        lastName: string;
        firstName: string;
        jobTitle: string;
        phone: string;
        mail: string;
        adress: string;
        description: string;
        photo: string;
      };
      skills: string[];
      interests: string[];
      careerPath: Career[];
      background: Background[];
      languageSkills: LanguageSkill[];
    };
  }
  
  export interface Career {
    startDate: string;
    endDate: string;
    company: string;
    title: string;
    tasks: string[];
  }
  
  export interface Background {
    startDate: string;
    endDate: string;
    company: string;
    degree: string[];
  }
  
  export interface LanguageSkill {
    language: string;
    level: string;
  }
  