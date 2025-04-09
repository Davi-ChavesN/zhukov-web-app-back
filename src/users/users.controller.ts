import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserOutputDTO } from "./dto/user-output.dto";
import { UserService } from "./users.service";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    async register(@Body() createUserDto: CreateUserDTO) {
        const response = await this.userService.createUser(createUserDto);
        return UserOutputDTO.toResponse(response);
    }

    @Get("all")
    async getUsers() {
        const users = await this.userService.getUsers();
        return users.map((user) => UserOutputDTO.toResponse(user));
    }

    @Get("/:id")
    async getUser(@Param("id") id: string) {
        const response = await this.userService.getUserById(id);
        return UserOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDTO) {
        const response = await this.userService.updateUser(id, dto);
        return UserOutputDTO.toResponse(response);
    }

    @Put("delete/:id")
    async deleteUser(@Param("id") id: string) {
        const response = await this.userService.deleteUser(id);
        return UserOutputDTO.toResponse(response);
    }
}