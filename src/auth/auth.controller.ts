import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CredentialsDTO } from "./dto/credentials.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    @ApiOperation({ summary: "Login" })
    @ApiResponse({ status: 200, description: "Login successful" })
    @ApiResponse({ status: 401, description: "Invalid credentials" })
    async Login(@Body() credentials: CredentialsDTO) {
        const response = await this.authService.login(credentials);
        return response;
    }
}