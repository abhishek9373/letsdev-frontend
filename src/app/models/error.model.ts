import { ToastService } from "../services/toast.service";

export class Utility {
  static decide(code: number, message?: string) {
    switch (code){
      case 200:
        ToastService.toast("Success", code);
        break;

      case 201:
        ToastService.toast("Successfully created!", code);
        break;

      case 204:
        ToastService.toast("updation success", code);
        break

      case 301:
        ToastService.toast("url is moved permanently", code);
        break;

      case 400:
        ToastService.toast(message || "Bad Request", code);
        break;

      case 404:
        ToastService.toast("No route found", code);
        break;

      case 500:
        ToastService.toast("Internal Server Error", code);
        break

      case 501:
        ToastService.toast("Not implemented stay tuned for future!", code);
        break;

      default:
        ToastService.toast(message ? message : "Something went wrong try again later!");
        break;
    }
  }
}

interface Inpute {
  method: string;
  url: string;
  options: object;
}
