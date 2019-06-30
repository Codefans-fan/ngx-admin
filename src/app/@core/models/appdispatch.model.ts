/**
 * create by fky
 * create on 2019-6-26
 */
export interface AppVersion {

  downloadCount: number;

  version: number;

  appFile: string;


  createTime: Date;
}


export class AppdispatchModel {
  id?: number;
  appId?: string;
  appName?: string;
  combo?: string;
  appType?: number;
  appBundle?: string;
  downloadCount?: number;
  appVersion?: string;
  version?: number;
  appFile?: string;

  versionList?: Array<AppVersion>;
}
