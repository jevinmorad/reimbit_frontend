import packageJson from "../package.json";

// ----------------------------------------------------------------------

type FieldsType = {
  Label: string;
};

type AuditFields = {
  Label: string;
  CreatedByUserName: FieldsType;
  ModifiedByUserName: FieldsType;
  Created: FieldsType;
  Modified: FieldsType;
};

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  apiBaseUrl: string;
  auth: {
    redirectPath: string;
  };
  DateTimePatterns: {
    DateTime: string;
    Date: string;
    Month_Year_Short_Format: string;
    Month_Year_Full_Format: string;
    Year: string;
    Time: string;
    Split: {
      DateTime: string;
      Date: string;
    };
    ParamCase: {
      DateTime: string;
      Time: string;
      Date: string;
      DateReverse: string;
      MonthYear: string;
    };
  };
  DefaultPageSize: number;
  AuditFields: AuditFields;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "Reimbit",
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? "",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",

  /**
   * Auth
   * @method jwt
   */
  auth: {
    redirectPath: "/dashboard",
  },
  DateTimePatterns: {
    DateTime: "DD MMM YYYY h:mm A", // 17 Apr 2022 12:00 am
    Date: "DD MMM YYYY", // 17 Apr 2022
    Month_Year_Short_Format: "MMM YYYY",
    Month_Year_Full_Format: "MMMM YYYY",
    Year: "YYYY",
    Time: "h:mm a", // 12:00 am
    Split: {
      DateTime: "DD/MM/YYYY h:mm A", // 17/04/2022 12:00 am
      Date: "DD/MM/YYYY", // 17/04/2022
    },
    ParamCase: {
      DateTime: "DD-MM-YYYY h:mm A", // 17-04-2022 12:00 am
      Time: "h:mm A",
      Date: "DD-MM-YYYY", // 17-04-2022
      DateReverse: "YYYY-MM-DD", // 2022-04-17 for compare date
      MonthYear: "MMM-YYYY",
    },
  },
  DefaultPageSize: 10,
  AuditFields: {
    Label: "Other Information",
    CreatedByUserName: {
      Label: "Created By User",
    },
    ModifiedByUserName: {
      Label: "Modified By User",
    },
    Created: {
      Label: "Created",
    },
    Modified: {
      Label: "Modified",
    },
  },
};
