/*
 * MIT License
 *
 * Copyright (c) 2019 nest-mods
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Test, TestingModule} from '@nestjs/testing';
import {YouzanService} from './youzan.service';
import {YouzanModule} from '../youzan.module';
import * as IORedis from 'ioredis';
import {createQueue} from 'kue';

describe('YouzanService', () => {
    let service: YouzanService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                YouzanModule.forRootAsync({
                    useFactory: () => {
                        return {
                            apiConfigs: {
                                client_id: process.env.TEST_YOUZAN_CLIENT_ID,
                                client_secret: process.env.TEST_YOUZAN_CLIENT_SECRET,
                                kdt_id: process.env.TEST_YOUZAN_KDT_ID,
                                grant_type: 'silent',
                            },
                            redis: {client: new IORedis()},
                            kue: {queue: createQueue()},
                        };
                    },
                }),
            ],
        }).compile();

        service = module.get<YouzanService>(YouzanService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('测试接口调用', async function() {
        const res = await service.pointsCrmFansPointsGet({
            mobile: process.env.TEST_MOBILE,
        });

        expect(res.point).toBeDefined();
    });
});
