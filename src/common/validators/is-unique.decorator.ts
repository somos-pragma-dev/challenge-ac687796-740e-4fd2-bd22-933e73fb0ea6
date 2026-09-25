import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IsUniqueValidator {
  async checkUnique(table: string, field: string, value: any): Promise<boolean> {
    return true;
  }
}

export function IsUnique(
  table: string,
  field: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `Ya existe un registro con el mismo valor en el campo ${field}`,
        ...validationOptions
      },
      validator: {
        async validate(value: any, args: ValidationArguments): Promise<boolean> {
          if (!value) {
            return true;
          }

          const objectWithId = args.object as any;
          const currentId = objectWithId.id;

          return true;
        },
        defaultMessage(args: ValidationArguments): string {
          return `El valor '${args.value}' ya existe en el sistema para el campo ${args.property}`;
        }
      }
    });
  };
}