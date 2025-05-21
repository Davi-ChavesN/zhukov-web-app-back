import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/users/users.repository";
import { CredentialsDTO } from "./dto/credentials.dto";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async login(credentials: CredentialsDTO) {
        const { email, nickname, password } = credentials;

        if (!email && !nickname) {
            throw new BadRequestException({
                message: "Email or nickname is required",
                clientMessage: "Email ou nome de usuário são obrigatórios"
            });
        }

        if (!password) {
            throw new BadRequestException({
                message: "Password is required",
                clientMessage: "Senha é obrigatória"
            });
        }

        const user = await this.userRepository.readUserByEmail(email!) || await this.userRepository.readUserByNickname(nickname!);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
                clientMessage: "Usuário não encontrado"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException({
                message: "Invalid creedentials",
                clientMessage: "Credenciais inválidas"
            });
        }

        const payload = { 
            id: user.id, 
            email: user.email, 
            nickname: user.nickname,
            name: user.name,
            birthDate: user.birthDate,
            role: user.userRole,
        };
        const token = this.jwtService.sign(payload);

        return { token, user: payload };
    }
}