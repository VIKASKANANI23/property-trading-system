import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Property Management System APIs')
    .setDescription(
      'The main objective of the NestJS Project On Property Management System  is to manage the details of  Cost, Property Type, Approvals, Sellers,Property',
    )
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Property Management System APIs',
    explorer: false,
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
