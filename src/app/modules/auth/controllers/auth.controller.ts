import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { TokenDto } from "../data/dtos/token.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local.guard";
import { GetAccessTokenDto } from "../data/dtos/get-access-token.dto";
import { JwtPayload } from "../data/jwt-payload";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("getAccessToken")
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: GetAccessTokenDto })
  @ApiResponse({ type: TokenDto })
  async getAccessToken(@Req() { user }: { user: JwtPayload }): Promise<TokenDto> {
    return this.authService.getAccessToken(user);
  }

}
