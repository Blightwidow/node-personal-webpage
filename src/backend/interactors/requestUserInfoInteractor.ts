import * as Interface from "../interfaces";
import * as Entity from "../entities";
import * as Dto from "../dtos";

export class RequestUserInfoInteractor implements Interface.RequestHandler {
  private readonly _userRepository: Interface.UserRepository;

  constructor(userRepository: Interface.UserRepository) {
    this._userRepository = userRepository;
  }

  public handle(req: Dto.UserInfoRequestMessage): Dto.UserInfoResponseMessage {
    let user = undefined;
    let errorMessage = "";
    let isSuccess = true;

    try {
      user = this._userRepository.getById(req.userId);
    }
    catch (e) {
      errorMessage = e.message;
      isSuccess = false;
    }

    return new Dto.UserInfoResponseMessage(user, isSuccess, errorMessage);
  }
}
