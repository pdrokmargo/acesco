export interface UserInterface {
  name: string;
  email: string;
  password: string;
  userType?: string;
  preRegistro?: {
    autorizations: {
      personalDataProtection: boolean;
      habeas: boolean;
      createdAt: Date;
      whoRefers: string;
      classification: string;
      serviceDescription: string;
    },
    generalInfo: {
      documentType: string;
      documentNumber: string;
      documentIssued: string;
      businessName: string;
      comercialName: string;
      ciiu: string;
      professionalCard: string;
    },
    supplierContactInfo: {
      contactName: string;
      position: string;
      address: string;
      country: string;
      dpto: string;
      city: string;
      zipcode: string;
      phone: number;
      mobile: number;
      fax: number;
      email: string;
      website: string;
    },
    managementSystemInformation: {
      iso9001: boolean;
      iso14001: boolean;
      oshas18001: boolean;
      antiCorruptionPolicy: boolean;
      sustainability: boolean;
      dueDiligence: boolean;
      socialResponsability: boolean;
      socialResponsabilityName: string;
      productSeal: boolean;
      productSealName: string;
    }
  };
}
