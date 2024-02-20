import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly secretKey: string = environment.encryptionKey;

  constructor() { }

  // Chiffrer les données
  private encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  // Déchiffrer les données
  private decryptData(data: string): any {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  // Enregistrer les données chiffrées dans le localStorage
  setData(data: any): void {
    const encryptedData = this.encryptData(data);
    localStorage.setItem('settings', encryptedData);
  }

  // Récupérer les données et les déchiffrer
  getData(): any {
    const encryptedData = localStorage.getItem('settings');
    if (encryptedData) {
      return this.decryptData(encryptedData);
    }
    return null;
  }

  // Effacer les données du localStorage
  removeData(): void {
    localStorage.removeItem('settings');
  }
}
