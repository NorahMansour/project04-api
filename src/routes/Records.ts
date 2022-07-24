import{Records} from '@prisma/client'
import { warnEnvConflicts } from '@prisma/client/runtime';
import { Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { prismaClient } from '../prisma';

const Records = Type.Object({
	record_id: Type.String(),
	moves: Type.Number(),
	time: Type.Number(),
});

export default async function (server: FastifyInstance) {
    server.route({
        method:'POST',
        url: '/records',
        schema: {
            summary: 'Upsertall recores',
            tags: ['Records'],
            body: Records,
        },
        
        handler: async (request, reply) => {
			const task = request.body as any;
			return await prismaClient.task.create({
				data:task ,
			});
            return prismaClient.task.findMany();
		},
	});

	server.route({
		method: 'GET',
		url: '/records',
		schema: {
			summary: 'Gets all recores',
			tags: ['Records'],

			response: {
				'2xx': Type.Array(Records),
			},
		},
		handler: async (request, reply) => {
			return await prismaClient.records.findMany();
		},
	});
}