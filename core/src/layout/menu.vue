<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '../store/modules/ui'
import { textColor4grayLevel, mixColorLevel9 } from '../util/color'
import type { navTextColor } from '../types/ui'

type hoverType = 'light' | 'drak' | 'gray'

const router = useRouter()

const uiStore = useUiStore()

const layout = computed(() => uiStore.getLayout)

const background = computed<string>((): string => {
    const drak = uiStore.getDark
    if (drak) {
        return 'var(--el-bg-color)'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            return uiStore.getNavBgColor
        } else {
            return 'var(--el-bg-color)'
        }
    }
})

const txtColor = computed<navTextColor>((): navTextColor => {
    const drak = uiStore.getDark
    if (drak) {
        return '#E5EAF3'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            return textColor4grayLevel(uiStore.getNavBgColor)
        } else {
            return '#303133'
        }
    }
})

// --- 经过/选中 -----------------------

const hover = computed<hoverType>((): hoverType => {
    const drak = uiStore.getDark
    if (drak) {
        document.documentElement.style.setProperty('--n-nav-text-color', txtColor.value)
        document.documentElement.style.setProperty('--n-nav-bg-color', background.value)
        document.documentElement.style.setProperty('--n-nav-hover-bg-color', '#434343')
        return 'drak'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            let txtColor = textColor4grayLevel(uiStore.getNavBgColor)
            if (txtColor == '#E5EAF3') {
                document.documentElement.style.setProperty('--n-nav-text-color', txtColor)
                document.documentElement.style.setProperty('--n-nav-bg-color', background.value)
                document.documentElement.style.setProperty('--n-nav-hover-bg-color', mixColorLevel9(background.value)[2])
                return 'gray'
            }
        }
        return 'light'
    }
})

const resetMenuPopper = () => {
    const subMenuEl = document.querySelectorAll('body>div>.n-sub-menu')
    const io = new MutationObserver((m) => {
        m.forEach(v => {
            if (v.attributeName === 'style' && window.getComputedStyle(v.target as Element).display !== 'none') {
                if (Number(window.getComputedStyle(v.target as HTMLElement).left.slice(0, -2)) < 10) {
                    let hv = v.target as HTMLElement
                    hv.style.left = window.getComputedStyle(subMenuEl[0]).left
                    hv.style.bottom = (Number(hv.style.bottom.slice(0, -2)) - 62) + 'px'
                }
            }
        })
    })
    subMenuEl.forEach(v => {
        io.observe(v, { attributes: true })
    })
}

onMounted(() => {
    new MutationObserver(() => {
        resetMenuPopper()
    }).observe(document.querySelector('body>div[id^="el-popper-container"]') as Element, {
        childList: true
    })
    resetMenuPopper()
})


const collapse = computed(() => uiStore.getCollapse)

const active = computed(() => router.currentRoute.value.fullPath)

const menu = ref({"code":200,"message":"查询成功","result":[{"id":"1441846243914678273","parentId":"0","type":0,"name":"个人中心","icon":"User","page":0,"menu":0,"url":"","path":"profile","sort":1,"status":1,"actionList":[],"apiList":"","child":[{"id":"1441847313260871681","parentId":"1441846243914678273","type":1,"name":"个人资料","icon":"","page":0,"menu":0,"url":"","path":"profile/info","sort":1,"status":1,"actionList":[{"id":"1455105147446300673","parentId":"1441847313260871681","type":2,"name":"编辑资料","icon":"","page":0,"menu":0,"url":"","path":"profile/info/edit","sort":1,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1441847763108364289","parentId":"1441846243914678273","type":1,"name":"我的消息","icon":"","page":0,"menu":0,"url":"","path":"profile/message","sort":2,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1437100346605641729","parentId":"0","type":0,"name":"CRM","icon":"DataAnalysis","page":0,"menu":0,"url":"","path":"crm","sort":2,"status":1,"actionList":[],"apiList":"","child":[{"id":"1437100451643596801","parentId":"1437100346605641729","type":1,"name":"数据简报","icon":"","page":0,"menu":0,"url":"","path":"crm/analysis","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1439655885642465282","parentId":"1437100346605641729","type":1,"name":"销售管理","icon":"","page":0,"menu":0,"url":"","path":"crm/sell","sort":2,"status":1,"actionList":[],"apiList":"","child":[{"id":"1439655121285087233","parentId":"1439655885642465282","type":1,"name":"线索管理","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/lead","sort":1,"status":1,"actionList":[{"id":"1459120580948131842","parentId":"1439655121285087233","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/lead/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1467426333647724546","parentId":"1439655121285087233","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/lead/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1439655447409000450","parentId":"1439655885642465282","type":1,"name":"客户管理","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/customer","sort":2,"status":1,"actionList":[{"id":"1467426907009081346","parentId":"1439655447409000450","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/customer/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1467426965226020866","parentId":"1439655447409000450","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/customer/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1467427044196376577","parentId":"1439655447409000450","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/customer/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1439657316017569793","parentId":"1439655885642465282","type":1,"name":"联系人管理","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/contact","sort":3,"status":1,"actionList":[{"id":"1460320812401012738","parentId":"1439657316017569793","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/contact/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1460485839091150850","parentId":"1439657316017569793","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/contact/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1460558126951694337","parentId":"1439657316017569793","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/contact/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1439658305630044162","parentId":"1439655885642465282","type":1,"name":"商机管理","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/chance","sort":4,"status":1,"actionList":[{"id":"1460078498608857090","parentId":"1439658305630044162","type":2,"name":"新增商机","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/chance/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1460731858529927169","parentId":"1439658305630044162","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/chance/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1460738666493399041","parentId":"1439658305630044162","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/chance/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1439658668517031938","parentId":"1439655885642465282","type":1,"name":"跟进事件","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/event","sort":5,"status":1,"actionList":[{"id":"1461917646428880897","parentId":"1439658668517031938","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/sell/event/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]}]},{"id":"1439659277127319554","parentId":"1437100346605641729","type":1,"name":"合同收款","icon":"","page":0,"menu":0,"url":"","path":"crm/finance","sort":3,"status":1,"actionList":[],"apiList":"","child":[{"id":"1439659487991758849","parentId":"1439659277127319554","type":1,"name":"合同管理","icon":"","page":0,"menu":0,"url":"","path":"crm/finance/contract","sort":1,"status":1,"actionList":[{"id":"1464002253886324738","parentId":"1439659487991758849","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/finance/contract/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1464231436747034625","parentId":"1439659487991758849","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/finance/contract/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1464231591600738305","parentId":"1439659487991758849","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"crm/finance/contract/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1439659726240808962","parentId":"1439659277127319554","type":1,"name":"收款管理","icon":"","page":0,"menu":0,"url":"","path":"crm/finance/receipt","sort":2,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1439660574039670786","parentId":"1437100346605641729","type":1,"name":"高级设置","icon":"","page":0,"menu":0,"url":"","path":"crm/setting","sort":4,"status":1,"actionList":[],"apiList":"","child":[{"id":"1439661051452129282","parentId":"1439660574039670786","type":1,"name":"公海管理","icon":"","page":0,"menu":0,"url":"","path":"crm/setting/sea","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1439661271376265218","parentId":"1439660574039670786","type":1,"name":"方案管理","icon":"","page":0,"menu":0,"url":"","path":"crm/setting/case","sort":2,"status":1,"actionList":[{"id":"1468965388218822658","parentId":"1439661271376265218","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/setting/case/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1468974280826986498","parentId":"1439661271376265218","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/setting/case/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1468974402017206273","parentId":"1439661271376265218","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"crm/setting/case/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]}]},{"id":"1439662022483836930","parentId":"1437100346605641729","type":1,"name":"产品管理","icon":"","page":0,"menu":0,"url":"","path":"crm/product","sort":5,"status":1,"actionList":[{"id":"1463339011314565122","parentId":"1439662022483836930","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"crm/product/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1463562237968187393","parentId":"1439662022483836930","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"crm/product/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1463562320570810370","parentId":"1439662022483836930","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"crm/product/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]}]},{"id":"1441842213440192514","parentId":"0","type":0,"name":"OA办公","icon":"DataBoard","page":0,"menu":0,"url":"","path":"oa","sort":3,"status":1,"actionList":[],"apiList":"","child":[{"id":"1450914144412004354","parentId":"1441842213440192514","type":1,"name":"邮件","icon":"","page":0,"menu":0,"url":"","path":"oa/email","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450914772278341634","parentId":"1441842213440192514","type":1,"name":"日程","icon":"","page":0,"menu":0,"url":"","path":"oa/schedule","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450917567425441794","parentId":"1441842213440192514","type":1,"name":"个人办公","icon":"","page":0,"menu":0,"url":"","path":"oa/personal","sort":3,"status":1,"actionList":[],"apiList":"","child":[{"id":"1450918361222639617","parentId":"1450917567425441794","type":1,"name":"任务指派","icon":"","page":0,"menu":0,"url":"","path":"oa/personal/job","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450919016263872514","parentId":"1450917567425441794","type":1,"name":"工作日志","icon":"","page":0,"menu":0,"url":"","path":"oa/personal/diary","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450920388786941953","parentId":"1450917567425441794","type":1,"name":"工作汇报","icon":"","page":0,"menu":0,"url":"","path":"oa/personal/summary","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450920708556484610","parentId":"1450917567425441794","type":1,"name":"文件柜","icon":"","page":0,"menu":0,"url":"","path":"oa/personal/file","sort":4,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450921043811397634","parentId":"1450917567425441794","type":1,"name":"通讯录","icon":"","page":0,"menu":0,"url":"","path":"oa/personal/contacts","sort":5,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1450917931650412545","parentId":"1441842213440192514","type":1,"name":"综合办公","icon":"","page":0,"menu":0,"url":"","path":"oa/general","sort":4,"status":1,"actionList":[],"apiList":"","child":[{"id":"1450922336286175233","parentId":"1450917931650412545","type":1,"name":"信息公告","icon":"","page":0,"menu":0,"url":"","path":"oa/general/article","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450922492532387842","parentId":"1450917931650412545","type":1,"name":"通知公告","icon":"","page":0,"menu":0,"url":"","path":"oa/general/notice","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450922832539447298","parentId":"1450917931650412545","type":1,"name":"会议管理","icon":"","page":0,"menu":0,"url":"","path":"oa/general/meeting","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450923256365477890","parentId":"1450917931650412545","type":1,"name":"招聘管理","icon":"","page":0,"menu":0,"url":"","path":"oa/general/recruit","sort":4,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450923526273134594","parentId":"1450917931650412545","type":1,"name":"活动中心","icon":"","page":0,"menu":0,"url":"","path":"oa/general/activity","sort":5,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1450923685245644802","parentId":"1450917931650412545","type":1,"name":"调查投票","icon":"","page":0,"menu":0,"url":"","path":"oa/general/vote","sort":6,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1450928383365246977","parentId":"1441842213440192514","type":1,"name":"工作流","icon":"","page":0,"menu":0,"url":"","path":"oa/workflow","sort":5,"status":1,"actionList":[],"apiList":"","child":[{"id":"1526440341970948097","parentId":"1450928383365246977","type":1,"name":"发起工作","icon":"","page":0,"menu":0,"url":"","path":"oa/workflow/work","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1501952689097949186","parentId":"1450928383365246977","type":1,"name":"流程分类","icon":"","page":0,"menu":0,"url":"","path":"oa/workflow/category","sort":2,"status":1,"actionList":[{"id":"1503038702624018434","parentId":"1501952689097949186","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"oa/workflow/category/add","sort":9999,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1496873132091281410","parentId":"1450928383365246977","type":1,"name":"表单管理","icon":"","page":0,"menu":0,"url":"","path":"oa/workflow/form","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1496867347273650178","parentId":"1450928383365246977","type":1,"name":"流程管理","icon":"","page":0,"menu":0,"url":"","path":"oa/workflow/flow","sort":4,"status":1,"actionList":[],"apiList":"","child":[]}]}]},{"id":"1441842810377732098","parentId":"0","type":0,"name":"线上商城","icon":"ShoppingCart","page":0,"menu":0,"url":"","path":"shop","sort":4,"status":1,"actionList":[],"apiList":"","child":[{"id":"1471308082922655746","parentId":"1441842810377732098","type":1,"name":"商品","icon":"","page":0,"menu":0,"url":"","path":"shop/goods","sort":1,"status":1,"actionList":[],"apiList":"","child":[{"id":"1630559127349682178","parentId":"1471308082922655746","type":1,"name":"商品管理","icon":"","page":0,"menu":0,"url":"","path":"shop/goods/goods","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1630559459647610882","parentId":"1471308082922655746","type":1,"name":"分类管理","icon":"","page":0,"menu":0,"url":"","path":"shop/goods/category","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1630559714871009282","parentId":"1471308082922655746","type":1,"name":"类型管理","icon":"","page":0,"menu":0,"url":"","path":"shop/goods/type","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1630559819997044738","parentId":"1471308082922655746","type":1,"name":"规格管理","icon":"","page":0,"menu":0,"url":"","path":"shop/goods/spec","sort":4,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1630559992722677762","parentId":"1471308082922655746","type":1,"name":"品牌管理","icon":"","page":0,"menu":0,"url":"","path":"shop/goods/brand","sort":5,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1630560300832055298","parentId":"1441842810377732098","type":1,"name":"店铺","icon":"","page":0,"menu":0,"url":"","path":"shop/store","sort":2,"status":1,"actionList":[],"apiList":"","child":[{"id":"1632072175465975810","parentId":"1630560300832055298","type":1,"name":"自营店铺","icon":"","page":0,"menu":0,"url":"","path":"shop/store/office","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1632072277760856065","parentId":"1630560300832055298","type":1,"name":"商铺管理","icon":"","page":0,"menu":0,"url":"","path":"shop/store/store","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1632073020257521666","parentId":"1630560300832055298","type":1,"name":"售卖区域","icon":"","page":0,"menu":0,"url":"","path":"shop/store/transport","sort":3,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1630560713891307521","parentId":"1441842810377732098","type":1,"name":"会员","icon":"","page":0,"menu":0,"url":"","path":"shop/member","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1630560859194580994","parentId":"1441842810377732098","type":1,"name":"订单","icon":"","page":0,"menu":0,"url":"","path":"shop/order","sort":4,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1630561049162997762","parentId":"1441842810377732098","type":1,"name":"运营","icon":"","page":0,"menu":0,"url":"","path":"shop/operate","sort":5,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1632070807636332545","parentId":"1441842810377732098","type":1,"name":"设置","icon":"","page":0,"menu":0,"url":"","path":"shop/setting","sort":6,"status":1,"actionList":[],"apiList":"","child":[{"id":"1632071185064972289","parentId":"1632070807636332545","type":1,"name":"快递公司","icon":"","page":0,"menu":0,"url":"","path":"shop/setting/express","sort":1,"status":1,"actionList":[],"apiList":"","child":[]}]}]},{"id":"1441843159402545154","parentId":"0","type":0,"name":"企业门户","icon":"Monitor","page":0,"menu":0,"url":"","path":"portal","sort":5,"status":1,"actionList":[],"apiList":"","child":[{"id":"1522130112030482434","parentId":"1441843159402545154","type":1,"name":"发布管理","icon":"","page":0,"menu":0,"url":"","path":"portal/publish","sort":1,"status":1,"actionList":[],"apiList":"","child":[{"id":"1522132320541253634","parentId":"1522130112030482434","type":1,"name":"发布内容","icon":"","page":0,"menu":0,"url":"","path":"portal/publish/content","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1522132689967161346","parentId":"1522130112030482434","type":1,"name":"专题管理","icon":"","page":0,"menu":0,"url":"","path":"portal/publish/topic","sort":2,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1522129732987035650","parentId":"1441843159402545154","type":1,"name":"内容管理","icon":"","page":0,"menu":0,"url":"","path":"portal/content","sort":2,"status":1,"actionList":[],"apiList":"","child":[{"id":"1509882586199097346","parentId":"1522129732987035650","type":1,"name":"栏目管理","icon":"","page":0,"menu":0,"url":"","path":"portal/content/category","sort":1,"status":1,"actionList":[{"id":"1511200218143756290","parentId":"1509882586199097346","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"portal/category/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1522130845706526722","parentId":"1522129732987035650","type":1,"name":"模型管理","icon":"","page":0,"menu":0,"url":"","path":"portal/content/model","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1522131024526483458","parentId":"1522129732987035650","type":1,"name":"类别管理","icon":"","page":0,"menu":0,"url":"","path":"portal/content/type","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1522131157133598721","parentId":"1522129732987035650","type":1,"name":"推荐管理","icon":"","page":0,"menu":0,"url":"","path":"portal/content/position","sort":4,"status":1,"actionList":[],"apiList":"","child":[]}]}]},{"id":"1441837851049459714","parentId":"0","type":0,"name":"配置管理","icon":"Operation","page":0,"menu":0,"url":"","path":"configuration","sort":94,"status":1,"actionList":[],"apiList":"","child":[{"id":"1441838088786804738","parentId":"1441837851049459714","type":1,"name":"微信公众号","icon":"","page":0,"menu":0,"url":"","path":"configuration/wxmp","sort":1,"status":1,"actionList":[],"apiList":"","child":[{"id":"1441838660403331073","parentId":"1441838088786804738","type":1,"name":"关注回复","icon":"","page":0,"menu":0,"url":"","path":"configuration/wxmp/subscribe","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1441838957376831489","parentId":"1441838088786804738","type":1,"name":"关键词回复","icon":"","page":0,"menu":0,"url":"","path":"configuration/wxmp/keyword","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1441840060394897410","parentId":"1441838088786804738","type":1,"name":"自定义菜单","icon":"","page":0,"menu":0,"url":"","path":"configuration/wxmp/menu","sort":3,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1441840799041191937","parentId":"1441837851049459714","type":1,"name":"微信小程序","icon":"","page":0,"menu":0,"url":"","path":"configuration/wxma","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1441840978024726530","parentId":"1441837851049459714","type":1,"name":"微信支付","icon":"","page":0,"menu":0,"url":"","path":"configuration/wxpay","sort":3,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1470720656195743746","parentId":"0","type":0,"name":"在线开发","icon":"MostlyCloudy","page":0,"menu":0,"url":"","path":"online","sort":95,"status":1,"actionList":[],"apiList":"","child":[{"id":"1470722261280387073","parentId":"1470720656195743746","type":1,"name":"表单开发","icon":"","page":0,"menu":0,"url":"","path":"online/form","sort":1,"status":1,"actionList":[{"id":"1470735549296832514","parentId":"1470722261280387073","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"online/form/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]}]},{"id":"1583652684081795074","parentId":"0","type":0,"name":"扩展应用","icon":"Compass","page":0,"menu":0,"url":"","path":"attach","sort":96,"status":1,"actionList":[],"apiList":"","child":[{"id":"1583653597240496130","parentId":"1583652684081795074","type":1,"name":"单点登录","icon":"","page":0,"menu":0,"url":"","path":"attach/sso","sort":1,"status":1,"actionList":[],"apiList":"","child":[{"id":"1583654037415923713","parentId":"1583653597240496130","type":1,"name":"应用管理","icon":"","page":0,"menu":0,"url":"","path":"attach/sso/application","sort":1,"status":1,"actionList":[],"apiList":"","child":[]}]}]},{"id":"1435888084180017666","parentId":"0","type":0,"name":"系统设置","icon":"SetUp","page":0,"menu":0,"url":"","path":"system","sort":97,"status":1,"actionList":[],"apiList":"","child":[{"id":"1435888084180017154","parentId":"1435888084180017666","type":1,"name":"用户管理","icon":"","page":0,"menu":0,"url":"","path":"system/user","sort":1,"status":1,"actionList":[{"id":"1438582764860661761","parentId":"1435888084180017154","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"system/user/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1455399988952690690","parentId":"1435888084180017154","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"system/user/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1455400318436241410","parentId":"1435888084180017154","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"system/user/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1455400682539577345","parentId":"1435888084180017154","type":2,"name":"详情","icon":"","page":0,"menu":0,"url":"","path":"system/user/detail","sort":4,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1435888272542015490","parentId":"1435888084180017666","type":1,"name":"角色管理","icon":"","page":0,"menu":0,"url":"","path":"system/groups","sort":2,"status":1,"actionList":[{"id":"1452795234284011521","parentId":"1435888272542015490","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"system/groups/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1452798823970713601","parentId":"1435888272542015490","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"system/groups/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1452991141386465281","parentId":"1435888272542015490","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"system/groups/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1465351656074952706","parentId":"1435888272542015490","type":2,"name":"权限","icon":"","page":0,"menu":0,"url":"","path":"system/groups/permission","sort":4,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1465353891882254338","parentId":"1435888272542015490","type":2,"name":"人员","icon":"","page":0,"menu":0,"url":"","path":"system/groups/user","sort":5,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1435888084180017888","parentId":"1435888084180017666","type":1,"name":"菜单管理","icon":"","page":0,"menu":0,"url":"system/rule","path":"system/rule","sort":3,"status":1,"actionList":[{"id":"1452701266720411650","parentId":"1435888084180017888","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"system/rule/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1452721925722738689","parentId":"1435888084180017888","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"system/rule/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1452721813176979457","parentId":"1435888084180017888","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"system/rule/edit","sort":9999,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1435889208442232833","parentId":"1435888084180017666","type":1,"name":"部门管理","icon":"","page":0,"menu":0,"url":"","path":"system/depart","sort":4,"status":1,"actionList":[{"id":"1455442537478107137","parentId":"1435889208442232833","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"system/depart/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1481907089438773250","parentId":"1435889208442232833","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"system/depart/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1481907275049308162","parentId":"1435889208442232833","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"system/depart/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1435889628594053122","parentId":"1435888084180017666","type":1,"name":"职务管理","icon":"","page":0,"menu":0,"url":"","path":"system/position","sort":5,"status":1,"actionList":[{"id":"1452993929017331713","parentId":"1435889628594053122","type":2,"name":"新增","icon":"","page":0,"menu":0,"url":"","path":"system/position/add","sort":1,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1452994066204626946","parentId":"1435889628594053122","type":2,"name":"编辑","icon":"","page":0,"menu":0,"url":"","path":"system/position/edit","sort":2,"status":1,"actionList":[],"apiList":"","child":""},{"id":"1452994175176839170","parentId":"1435889628594053122","type":2,"name":"删除","icon":"","page":0,"menu":0,"url":"","path":"system/position/delete","sort":3,"status":1,"actionList":[],"apiList":"","child":""}],"apiList":"","child":[]},{"id":"1529307680554938370","parentId":"1435888084180017666","type":1,"name":"数据字典","icon":"","page":0,"menu":0,"url":"","path":"system/dictionary","sort":6,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1537188359255990274","parentId":"1435888084180017666","type":1,"name":"资源管理","icon":"","page":0,"menu":0,"url":"","path":"system/resource","sort":7,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1567333084897685506","parentId":"0","type":0,"name":"系统运维","icon":"Setting","page":0,"menu":0,"url":"","path":"devops","sort":98,"status":1,"actionList":[],"apiList":"","child":[{"id":"1567377663646732290","parentId":"1567333084897685506","type":1,"name":"数据库","icon":"","page":0,"menu":0,"url":"","path":"devops/database","sort":1,"status":1,"actionList":[],"apiList":"","child":[]}]},{"id":"1443047248912232450","parentId":"0","type":0,"name":"状态监控","icon":"PieChart","page":0,"menu":0,"url":"","path":"analysis","sort":99,"status":1,"actionList":[],"apiList":"","child":[{"id":"1453131599475417089","parentId":"1443047248912232450","type":1,"name":"服务器","icon":"","page":0,"menu":0,"url":"","path":"analysis/server","sort":1,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1453720847303872513","parentId":"1443047248912232450","type":1,"name":"操作日志","icon":"","page":0,"menu":0,"url":"","path":"analysis/logs","sort":2,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1454252114629947393","parentId":"1443047248912232450","type":1,"name":"请求追踪","icon":"","page":0,"menu":0,"url":"","path":"analysis/request","sort":3,"status":1,"actionList":[],"apiList":"","child":[]},{"id":"1454252487738454017","parentId":"1443047248912232450","type":1,"name":"SQL监控","icon":"","page":0,"menu":0,"url":"","path":"analysis/sql","sort":4,"status":1,"actionList":[],"apiList":"","child":[]}]}]})

const click = (index: string): void => {
    if (index == 'dashboard') {
        router.push({
            path: '/dashboard'
        })
    } else {
        router.push({
            path: index
        })
    }
}

</script>
<template>
    <div class="n-menu d-flex flex-column h-100" :style="{ background: background }">
        <el-scrollbar>
            <el-menu :class="['n-menu-' + layout, { 'n-menu-drak-active': hover == 'drak', 'n-menu-ligth-active': hover == 'light', 'n-menu-gray-active': hover == 'gray' }]" :default-active="active" :collapse="collapse" :text-color="txtColor" @select="click">
                <el-menu-item index="/dashboard">
                    <el-icon>
                        <home-filled />
                    </el-icon>
                    <span>控制台</span>
                </el-menu-item>
                <template v-for="item in menu.result" :key="item.id">
                    <el-menu-item v-if="!item.child || item.child.length <= 0" :index="item.path">
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                    <el-sub-menu v-if="item.child && item.child.length > 0" popper-class="n-sub-menu" :index="'/' + item.path">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon" />
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="jtem in item.child" :key="jtem.id">
                            <el-menu-item v-if="!jtem.child || jtem.child.length <= 0" :index="'/' + jtem.path">
                                <div style="padding-left:12px">{{ jtem.name }}</div>
                            </el-menu-item>
                            <el-sub-menu v-if="jtem.child && jtem.child.length > 0" :index="'/' + jtem.path">
                                <template #title>
                                    <div style="padding-left:12px">{{ jtem.name }}</div>
                                </template>
                                <!-- <el-menu-item v-for="ktem in jtem.child" :key="ktem.id" :index="'/' + ktem.path">{{ ktem.name }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </el-menu-item> -->
                            </el-sub-menu>
                        </template>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<style lang="scss" scoped>
.n-menu {

    :deep(.el-menu) {
        background-color: v-bind('background') !important;
    }

    :deep(.n-menu-classic) {
        width: 200px !important;
        border-right: none !important;

        // 折叠时宽度
        &.el-menu--collapse {
            width: 64px !important;
        }

    }

    :deep(.n-menu-ligth-active) {

        .el-menu-item {

            // 设置子菜单悬停的高亮和背景色
            &:hover {
                background-color: var(--el-menu-item-hover-fill) !important;
            }

            // 设置选中时的高亮背景和高亮颜色  
            &.is-active {
                position: relative;
                color: var(--el-color-primary);
                background-color: var(--el-menu-item-hover-fill) !important;

                &:after {
                    content: " ";
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--el-color-primary);
                }
            }
        }
    }

    :deep(.n-menu-gray-active) {
        .el-menu-item {

            // 设置子菜单悬停的高亮和背景色
            &:hover {
                background-color: var(--n-nav-hover-bg-color);
            }

            // 设置选中时的高亮背景和高亮颜色  
            &.is-active {
                position: relative;
                color: var(--n-nav-text-color);
                background-color: var(--el-color-primary);
            }
        }

        .el-sub-menu__title {
            &:hover {
                background-color: var(--n-nav-hover-bg-color);
            }
        }
    }

    :deep(.n-menu-drak-active) {
        .el-menu-item {

            // 设置子菜单悬停的高亮和背景色
            &:hover {
                background-color: #434343;
            }

            // 设置选中时的高亮背景和高亮颜色  
            &.is-active {
                position: relative;
                color: v-bind('txtColor');
                background-color: var(--el-color-primary-dark-2) !important;

                &:after {
                    content: " ";
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--el-color-primary);
                }
            }
        }

        .el-sub-menu__title {
            &:hover {
                background-color: #434343;
            }
        }
    }

    :deep(.n-menu-left) {
        width: 200px !important;
        border-right: none !important;

        // 折叠时宽度
        &.el-menu--collapse {
            width: 64px !important;
        }

    }
}
</style>
<style lang="scss">
.n-sub-menu {
    .el-menu--popup {
        background-color: var(--n-nav-bg-color) !important;

        .el-menu-item {
            &.is-active {
                position: relative;
                color: var(--n-nav-text-color);
                background-color: var(--el-color-primary);
            }

            // 设置子菜单悬停的高亮和背景色
            &:hover {
                background-color: var(--n-nav-hover-bg-color) !important;
            }
        }
    }
}
</style>