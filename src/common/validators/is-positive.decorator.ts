import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPositive(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPositive',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'El monto del préstamo debe ser un valor positivo',
        ...validationOptions
      },
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          if (value === undefined || value === null) {
            return true;
          }
          
          const numValue = typeof value === 'string' ? parseFloat(value) : value;
          
          if (isNaN(numValue)) {
            return false;
          }
          
          return numValue > 0;
        },
        defaultMessage(args: ValidationArguments): string {
          return `El campo ${args.property} debe contener un valor positivo mayor que cero`;
        }
      }
    });
  };
}