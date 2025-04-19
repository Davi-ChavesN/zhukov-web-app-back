import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserOutputDTO } from "./dto/user-output.dto";
import { UserService } from "./users.service";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    @ApiCreatedResponse({description: "User registered successfully"})
    @ApiConflictResponse({description: "Email already registered"})
    async register(@Body() dto: CreateUserDTO) {
        const response = await this.userService.createUser(dto);
        return UserOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOkResponse({description: "Users found"})
    @ApiNotFoundResponse({description: "No users found"})
    async getUsers() {
        const users = await this.userService.readUsers();
        return users.map((user) => UserOutputDTO.toResponse(user));
    }

    @Get("/:id")
    @ApiOkResponse({description: "User found"})
    @ApiNotFoundResponse({description: "User not found"})
    async getUser(@Param("id") id: string) {
        const response = await this.userService.readUserById(id);
        return UserOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    @ApiOkResponse({description: "User updated successfully"})
    @ApiNotFoundResponse({description: "User not found"})
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDTO) {
        const response = await this.userService.updateUser(id, dto);
        return UserOutputDTO.toResponse(response);
    }

    @Put("delete/:id")
    @ApiOkResponse({description: "User deleted successfully"})
    @ApiNotFoundResponse({description: "User not found"})
    async deleteUser(@Param("id") id: string) {
        const response = await this.userService.deleteUser(id);
        return UserOutputDTO.toResponse(response);
    }
}