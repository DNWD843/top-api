import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { Types } from 'mongoose'

/**
 * Декоратор приведения productId к типу ObjectId.
 * Преобразует строку вида ObjectId в тип ObjectId,
 * чтобы в БД productId имел тип ObjectIdб а не String.
 * Если этого не делать - не работает агрегация по productId
 */
export function IsObjectId(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value: string | Types.ObjectId, args: ValidationArguments) {
                    return Types.ObjectId.isValid(value) // Проверка, что значение является валидным ObjectId
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid ObjectId`
                },
            },
        })
    }
}
