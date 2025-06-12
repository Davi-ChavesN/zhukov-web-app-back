import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "./dto/in/create-user.dto";
import { UpdateUserPasswordDTO } from "./dto/in/update-user-password.dto";
import { UpdateUserDTO } from "./dto/in/update-user.dto";
import { UserOutputDTO } from "./dto/out/user-output.dto";
import { UserService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    @ApiOperation({ summary: "Registers a new user" })
    @ApiResponse({ status: 201, description: "User registered successfully", type: UserOutputDTO })
    @ApiResponse({ status: 400, description: "Email already registered" })
    @ApiBody({ type: CreateUserDTO })
    async register(@Body() dto: CreateUserDTO) {
        const response = await this.userService.createUser(dto);
        return UserOutputDTO.toResponse(response);
    }

    @UseGuards(JwtAuthGuard)
    @Get("all")
    @ApiOperation({ summary: "Gets all users" })
    @ApiResponse({ status: 200, description: "Users found", type: [UserOutputDTO] })
    @ApiResponse({ status: 404, description: "No users found" })
    async getUsers() {
        const users = await this.userService.readUsers();
        return users.map((user) => UserOutputDTO.toResponse(user));
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    @ApiOperation({ summary: "Gets user by ID" })
    @ApiResponse({ status: 200, description: "User found", type: UserOutputDTO })
    @ApiResponse({ status: 404, description: "User not found" })
    @ApiParam({ name: "id", description: "User ID", type: String })
    async getUser(@Param("id") id: string) {
        const response = await this.userService.readUserById(id);
        return UserOutputDTO.toResponse(response);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update/:id")
    @ApiOperation({ summary: "Updates user by ID" })
    @ApiResponse({ status: 200, description: "User updated successfully", type: UserOutputDTO })
    @ApiResponse({ status: 404, description: "User not found" })
    @ApiParam({ name: "id", description: "User ID", type: String })
    @ApiBody({ type: UpdateUserDTO })
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDTO) {
        const response = await this.userService.updateUser(id, dto);
        return UserOutputDTO.toResponse(response);
    }

    @UseGuards(JwtAuthGuard)
    @Put("update-password/:id")
    @ApiOperation({ summary: "Update user password by ID" })
    @ApiResponse({ status: 200, description: "Password updated successfully", type: UserOutputDTO })
    @ApiResponse({ status: 404, description: "User not found" })
    @ApiParam({ name: "id", description: "User ID", type: String })
    @ApiBody({ type: UpdateUserPasswordDTO })
    async updateUserPassword(@Param("id") id: string, @Body() dto: UpdateUserPasswordDTO) {
        const response = await this.userService.updateUserPassword(id, dto);
        return UserOutputDTO.toResponse(response);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch("update-role/:id")
    @ApiOperation({ summary: "Update user role by ID" })
    @ApiResponse({ status: 200, description: "Role updated successfully", type: UserOutputDTO })
    @ApiResponse({ status: 404, description: "User not found" })
    @ApiParam({ name: "id", description: "User ID", type: String })
    @ApiBody({ type: UpdateUserDTO })
    async updateUserRole(@Param("id") id: string, @Body() dto: UpdateUserDTO) {
        const response = await this.userService.updateUserRole(id, dto);
        return UserOutputDTO.toResponse(response);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    @ApiOperation({ summary: "Deletes user by ID" })
    @ApiResponse({ status: 200, description: "User deleted successfully", type: UserOutputDTO })
    @ApiResponse({ status: 200, description: "User not found" })
    @ApiParam({ name: "id", description: "User ID", type: String })
    async deleteUser(@Param("id") id: string) {
        const response = await this.userService.deleteUser(id);
        return UserOutputDTO.toResponse(response);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("enable/:id")
    @ApiOperation({ summary: "Enables user by ID" })
    @ApiResponse({ status: 200, description: "User enabled successfully", type: UserOutputDTO })
    @ApiResponse({ status: 200, description: "User not found" })
    @ApiParam({ name: "id", description: "User ID", type: String })
    async enableUser(@Param("id") id: string) {
        const response = await this.userService.enableUser(id);
        return UserOutputDTO.toResponse(response);
    }
}