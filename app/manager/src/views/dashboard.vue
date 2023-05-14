<script lang="ts" setup>
import { ref } from 'vue'
import WorkCard from '@/components/workCard.vue'

const lineOption = ref({
    grid: {
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%'
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
})

const pieOption = ref({
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})
</script>
<template>
    <div class="dashboard">
        <div class="card d-flex">
            <div>
                <el-card class="h-100 bg" :body-style="{ padding: '0px', height: '100%' }" shadow="never">
                    <div class="h-100 p-20 d-flex flex-column">
                        <div class="card-title">
                            <i class="icon el-icon-user"></i>
                            <span>用户总数</span>
                        </div>
                        <div class="card-main flex-fluid">
                            <div class="value pb-20">95690</div>
                            <div class="detail d-flex">
                                <div class="d-flex">
                                    <div>注册</div>
                                    <div class="ml-10"><span style="color:var(--el-color-success);margin-right:5px">&#9650;</span>512人
                                    </div>
                                </div>
                                <div class="d-flex ml-10">
                                    <div>注销</div>
                                    <div class="ml-10"><span style="color:var(--el-color-error);margin-right:5px">&#9660;</span>32人</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer pt-10">
                            增长率 12%
                        </div>
                    </div>
                </el-card>
            </div>
            <div>
                <el-card class="h-100 bg" :body-style="{ padding: '0px', height: '100%' }" shadow="never">
                    <div class="h-100 p-20 d-flex flex-column">
                        <div class="card-title">
                            <i class="icon el-icon-user"></i>
                            <span>销售金额</span>
                        </div>
                        <div class="card-main flex-fluid">
                            <div class="value pb-20">￥480000</div>
                            <div class="detail d-flex">
                                <div class="d-flex">
                                    <div>同比昨日</div>
                                    <div class="ml-10"><span style="color:var(--el-color-success);margin-right:5px">&#9650;</span>￥1012
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer pt-10">
                            增长率 7.5%
                        </div>
                    </div>
                </el-card>
            </div>
            <div>
                <el-card class="h-100 bg" :body-style="{ padding: '0px', height: '100%' }" shadow="never">
                    <div class="h-100 p-20 d-flex flex-column">
                        <div class="card-title">
                            <i class="icon el-icon-user"></i>
                            <span>订单投诉</span>
                        </div>
                        <div class="card-main flex-fluid">
                            <div class="value pb-20">12</div>
                            <div class="detail d-flex">
                                <div class="d-flex">
                                    <div>已处理</div>
                                    <div class="ml-10"><span style="color:var(--el-color-success)">10</span></div>
                                </div>
                                <div class="d-flex ml-10">
                                    <div>未处理</div>
                                    <div class="ml-10"><span style="color:var(--el-color-error)">0</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer pt-10">
                            增长率 -80.35%
                        </div>
                    </div>
                </el-card>
            </div>
            <div>
                <el-card class="h-100 bg" :body-style="{ padding: '0px', height: '100%' }" shadow="never">
                    <div class="h-100 p-20 d-flex flex-column">
                        <div class="card-title">
                            <i class="icon el-icon-user"></i>
                            <span>服务工单</span>
                        </div>
                        <div class="card-main flex-fluid">
                            <div class="value pb-20">1369</div>
                            <div class="detail d-flex">
                                <div class="d-flex">
                                    <div>已完成</div>
                                    <div class="ml-10"><span style="color:var(--el-color-success)">915</span></div>
                                </div>
                                <div class="d-flex ml-10">
                                    <div>未完成</div>
                                    <div class="ml-10"><span style="color:var(--el-color-error)">213</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer pt-10">
                            增长率 19%
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="user d-flex mt-10">
            <div class="center">
                <work-card />
            </div>
            <div class="area flex-fill d-flex">
                <div class="map h-100">
                    <el-card class="h-100" shadow="never">
                        <n-echart v-model="lineOption" />
                    </el-card>
                </div>
                <div class="active">
                    <el-card class="h-100" shadow="never">
                        <n-echart v-model="pieOption" />
                    </el-card>
                </div>
            </div>
        </div>
        <div class="message mt-10 d-flex">
            <div>
                <el-card class="h-100" shadow="never">
                    <div class="new">
                        <div class="new-title">N7M ADMIN V 0.0.1</div>
                        <div class="new-main developer">
                            <div class="d-flex">
                                <div>文档地址：</div>
                                <div><a href="https://thoughts.aliyun.com/sharespace/61775109996708001a43703e" target="_blank">开发文档</a>
                                </div>
                            </div>
                            <div class="d-flex mt-10">
                                <div>代码仓库：</div>
                                <div><a href="https://github.com/nunumao/nunumao-boot" target="_blank">github</a></div>
                                <div class="ml-10"><a href="https://gitee.com/nunumao/nunumao-boot" target="_blank">gitee</a></div>
                            </div>
                            <div class="d-flex mt-10">
                                <div>小程序：</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div>
                <el-card class="h-100" shadow="never">
                    <div class="new">
                        <div class="new-title">最新消息</div>
                        <div class="new-main">
                            <div v-for="item in 5" :key="item" class="new-item d-flex justify-content-between">
                                <div>[私信]您有一条需要处理的工作任务</div>
                                <div>2021-11-30 20:48:30</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div>
                <el-card class="h-100" shadow="never">
                    <div class="new">
                        <div class="new-title">技术文章</div>
                        <div class="new-main">
                            <div v-for="item in 5" :key="item" class="new-item d-flex justify-content-between">
                                <div>物联网MQTT协议接入教程</div>
                                <div>2021-11-30 20:48:30</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.dashboard {
    .card {
        margin: 0 -5px;

        &>div {
            flex: 0 0 25%;
            padding: 0 5px;
        }

        &-title {
            color: var(--el-text-color-placeholder);
        }

        .icon {
            margin-right: 5px;
        }

        &-main {
            padding: 10px 0;

            .value {
                font-size: 30px;
            }
        }

        &-footer {
            border-top: solid 1px var(--el-border-color-light);
        }
    }

    .user {
        margin: 0 -5px;

        .center {
            flex: 0 0 260px;
            padding: 0 5px;
        }

        .area {
            padding: 0 5px;

            &>div {
                flex: 0 0 50%;
            }

            .map {
                padding-right: 5px;
            }

            .active {
                padding-left: 5px;
            }
        }

        :deep(.el-card__body) {
            height: 100%;
            padding: 10px;
        }
    }

    .message {
        margin: 0 -5px;

        &>div {
            padding: 0 5px;
            flex: 0 0 33.3%;

            .new {
                &-title {
                    border-bottom: var(--el-border-base);
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }

                &-item {
                    padding-bottom: 10px;
                }
            }

            .developer {
                a {
                    color: #409eff;
                }
            }
        }
    }
}
</style>