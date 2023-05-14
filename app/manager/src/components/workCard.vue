<script lang="ts" setup>
import { withDefaults } from 'vue'

type Info = {
    avatar?: string
    name?: string
    gender?: string
    workNo?: string
    depart?: string[]
}

const props = withDefaults(defineProps<{
    info?: Info
}>(), {})

</script>
<template>
    <el-card class="n-work-card h-100" :body-style="{ padding: '0px' }" shadow="never">
        <div class="n-work-card-profle-title pb-20">
            <div class="face pt-20 d-flex justify-content-center align-items-center">
                <el-image class="img" :src="props.info?.avatar" fit="cover">
                    <template #error>
                        <img class="img-fluid" src="@/assets/image/default_face.jpg">
                    </template>
                </el-image>
            </div>
            <div class="d-flex justify-content-center mt-20">
                <div>
                    <el-button type="success" round size="small">个人中心</el-button>
                </div>
                <div style="width:10px"></div>
                <div>
                    <el-button type="danger" round size="small">修改密码</el-button>
                </div>
            </div>
        </div>
        <div class="n-work-card-profle-main p-20">
            <div class="d-flex">
                <div class="mr-10 d-flex align-items-center">
                    <el-icon>
                        <User />
                    </el-icon>
                </div>
                <div>{{ props.info?.name || '暂未填写' }}</div>
            </div>
            <div class="d-flex mt-10">
                <div class="mr-10 d-flex align-items-center">
                    <svg viewBox="0 0 1024 1024" width="14" height="14">
                        <path d="M494.464 658.285714c8.539429-103.533714 88.96-186.697143 191.250286-199.442285V209.097143l-156.141715 156.141714c-8.338286 103.753143-88.850286 187.154286-191.286857 199.917714V658.285714h156.178286z m2.285714 54.857143H338.285714v155.428572a27.428571 27.428571 0 0 1-54.857143 0V713.142857h-164.571428a27.428571 27.428571 0 0 1 0-54.857143h164.571428v-93.129143C175.177143 551.68 91.428571 459.337143 91.428571 347.428571c0-121.179429 98.249143-219.428571 219.428572-219.428571 102.619429 0 188.781714 70.436571 212.772571 165.595429l153.782857-153.782858a45.714286 45.714286 0 0 1 64.64 0l193.956572 193.956572a27.428571 27.428571 0 0 1-38.784 38.784L740.571429 215.917714v242.925715C848.822857 472.32 932.571429 564.662857 932.571429 676.571429c0 121.179429-98.249143 219.428571-219.428572 219.428571-108.726857 0-198.985143-79.085714-216.393143-182.857143zM310.857143 512a164.571429 164.571429 0 1 0 0-329.142857 164.571429 164.571429 0 0 0 0 329.142857z m402.285714 329.142857a164.571429 164.571429 0 1 0 0-329.142857 164.571429 164.571429 0 0 0 0 329.142857z" fill="var(--el-text-color-primary)"></path>
                    </svg>
                </div>
                <div>{{ props.info?.gender || '保密' }}</div>
            </div>
            <div class="d-flex mt-10">
                <div class="mr-10 d-flex align-items-center">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                </div>
                <div>{{ props.info?.workNo || '未填写' }}</div>
            </div>
            <div class="d-flex mt-10">
                <div class="mr-10 d-flex align-items-center">
                    <svg viewBox="0 0 1024 1024" width="12" height="12">
                        <path d="M977.454545 558.545455h-34.90909v-104.727273c0-44.218182-37.236364-81.454545-81.454546-81.454546H546.909091v-93.090909H744.727273c25.6 0 46.545455-20.945455 46.545454-46.545454V93.090909c0-25.6-20.945455-46.545455-46.545454-46.545454H279.272727c-25.6 0-46.545455 20.945455-46.545454 46.545454v139.636364c0 25.6 20.945455 46.545455 46.545454 46.545454h197.818182v93.090909H162.909091c-44.218182 0-81.454545 37.236364-81.454546 81.454546V558.545455H46.545455c-25.6 0-46.545455 20.945455-46.545455 46.545454v325.818182c0 25.6 20.945455 46.545455 46.545455 46.545454h139.636363c25.6 0 46.545455-20.945455 46.545455-46.545454V605.090909c0-25.6-20.945455-46.545455-46.545455-46.545454H151.272727v-104.727273c0-6.981818 4.654545-11.636364 11.636364-11.636364h314.181818v116.363637H442.181818c-25.6 0-46.545455 20.945455-46.545454 46.545454v325.818182c0 25.6 20.945455 46.545455 46.545454 46.545454h139.636364c25.6 0 46.545455-20.945455 46.545454-46.545454V605.090909c0-25.6-20.945455-46.545455-46.545454-46.545454h-34.909091v-116.363637H861.090909c6.981818 0 11.636364 4.654545 11.636364 11.636364V558.545455H837.818182c-25.6 0-46.545455 20.945455-46.545455 46.545454v325.818182c0 25.6 20.945455 46.545455 46.545455 46.545454h139.636363c25.6 0 46.545455-20.945455 46.545455-46.545454V605.090909c0-25.6-20.945455-46.545455-46.545455-46.545454zM162.909091 628.363636v279.272728H69.818182V628.363636h93.090909z m395.636364 0v279.272728h-93.09091V628.363636h93.09091zM302.545455 209.454545V116.363636h418.90909v93.090909H302.545455z m651.636363 698.181819h-93.090909V628.363636h93.090909v279.272728z" fill="var(--el-text-color-primary)"></path>
                    </svg>
                </div>
                <div class="d-flex">
                    <template v-if="props.info?.depart && props.info?.depart.length > 0">
                        <div v-for="item in props.info.depart" :key="item">{{ item }}</div>
                    </template>
                    <template v-else>
                        暂无部门
                    </template>
                </div>
            </div>
        </div>
    </el-card>
</template>
<style lang="scss" scoped>
.n-work-card {

    &-profle-title {
        background-size: 100% 100% !important;
        border-radius: var(--el-card-border-radius) var(--el-card-border-radius) 0 0;
        background: url(@/assets/image/profile_bg.png) no-repeat;

        .face {
            .img {
                display: block;
                $size: 64px;
                width: $size;
                height: $size;
                border-radius: 50%;
            }
        }
    }

    &-profle-main {
        &>div {
            border-bottom: solid 1px var(--el-border-color);
            padding-bottom: 10px;

            &:last-child {
                border: none;
            }
        }
    }
}
</style>