// gml_Object_tutorial_square_Draw_64  locals=2 args=0 len=7936
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 8
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x209E6B0
00000038: call display_get_dpi_x(argc=0)
00000040: pop.v.v dpx
00000048: push.v dpx
00000050: push.imm.e 200
00000054: cmp.i.v >
00000058: bf 0x209C838
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 2
00000070: conv.i.v
00000074: push.imm.e 2
00000078: conv.i.v
0000007C: call display_set_gui_maximise(argc=4)
00000084: popz
00000088: push.v dpx
00000090: push.imm.e 500
00000094: cmp.i.v >
00000098: bf 0x209C878
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 3
000000B0: conv.i.v
000000B4: push.imm.e 3
000000B8: conv.i.v
000000BC: call display_set_gui_maximise(argc=4)
000000C4: popz
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call draw_set_font(argc=1)
000000D8: popz
000000DC: push.d 0.7
000000E8: conv.d.v
000000EC: call draw_set_alpha(argc=1)
000000F4: popz
000000F8: push.builtin.v os_type
00000100: push.imm.e 0
00000104: cmp.i.v ==
00000108: bf 0x209CA48
0000010C: push.imm.e -1
00000110: push.imm.e 0
00000114: push.v obj0.view_wview[array]
0000011C: push.imm.e 1800
00000120: cmp.i.v <=
00000124: bf 0x209C9A4
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.i 16777215
00000138: conv.i.v
0000013C: push.i 16777215
00000144: conv.i.v
00000148: push.imm.e 30
0000014C: conv.i.v
00000150: push.imm.e 30
00000154: conv.i.v
00000158: push.imm.e -1
0000015C: push.imm.e 0
00000160: push.v obj0.view_hview[array]
00000168: push.imm.e 1
0000016C: mul.i.v
00000170: push.global.v global.sca
00000178: div.v.v
0000017C: push.imm.e 200
00000180: sub.i.v
00000184: push.imm.e -1
00000188: push.imm.e 0
0000018C: push.v obj0.view_wview[array]
00000194: push.imm.e 1
00000198: mul.i.v
0000019C: push.global.v global.sca
000001A4: div.v.v
000001A8: push.imm.e 30
000001AC: sub.i.v
000001B0: push.imm.e -1
000001B4: push.imm.e 0
000001B8: push.v obj0.view_hview[array]
000001C0: push.imm.e 1
000001C4: mul.i.v
000001C8: push.global.v global.sca
000001D0: div.v.v
000001D4: push.imm.e 300
000001D8: sub.i.v
000001DC: push.imm.e 30
000001E0: conv.i.v
000001E4: call draw_roundrect_colour_ext(argc=9)
000001EC: popz
000001F0: b 0x209CA48
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: push.i 16777215
00000204: conv.i.v
00000208: push.i 16777215
00000210: conv.i.v
00000214: push.imm.e 30
00000218: conv.i.v
0000021C: push.imm.e 30
00000220: conv.i.v
00000224: push.imm.e -1
00000228: push.imm.e 0
0000022C: push.v obj0.view_hview[array]
00000234: push.imm.e 1
00000238: mul.i.v
0000023C: push.global.v global.sca
00000244: div.v.v
00000248: push.imm.e 200
0000024C: sub.i.v
00000250: push.imm.e 1770
00000254: conv.i.v
00000258: push.imm.e -1
0000025C: push.imm.e 0
00000260: push.v obj0.view_hview[array]
00000268: push.imm.e 1
0000026C: mul.i.v
00000270: push.global.v global.sca
00000278: div.v.v
0000027C: push.imm.e 300
00000280: sub.i.v
00000284: push.imm.e 30
00000288: conv.i.v
0000028C: call draw_roundrect_colour_ext(argc=9)
00000294: popz
00000298: push.builtin.v os_type
000002A0: push.imm.e 4
000002A4: cmp.i.v ==
000002A8: bf 0x209CB30
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.i 16777215
000002BC: conv.i.v
000002C0: push.i 16777215
000002C8: conv.i.v
000002CC: push.imm.e 30
000002D0: conv.i.v
000002D4: push.imm.e 30
000002D8: conv.i.v
000002DC: push.imm.e -1
000002E0: push.imm.e 0
000002E4: push.v obj0.view_hview[array]
000002EC: push.imm.e 1
000002F0: mul.i.v
000002F4: push.global.v global.sca
000002FC: div.v.v
00000300: push.imm.e 200
00000304: sub.i.v
00000308: push.imm.e -1
0000030C: push.imm.e 0
00000310: push.v obj0.view_wview[array]
00000318: push.imm.e 1
0000031C: mul.i.v
00000320: push.global.v global.sca
00000328: div.v.v
0000032C: push.imm.e 30
00000330: sub.i.v
00000334: push.imm.e -1
00000338: push.imm.e 0
0000033C: push.v obj0.view_hview[array]
00000344: push.imm.e 1
00000348: mul.i.v
0000034C: push.global.v global.sca
00000354: div.v.v
00000358: push.imm.e 300
0000035C: sub.i.v
00000360: push.v went
00000368: sub.v.v
0000036C: push.imm.e 30
00000370: conv.i.v
00000374: call draw_roundrect_colour_ext(argc=9)
0000037C: popz
00000380: push.imm.e 1
00000384: conv.i.v
00000388: call draw_set_alpha(argc=1)
00000390: popz
00000394: push.v phase
0000039C: push.imm.e 0
000003A0: cmp.i.v ==
000003A4: bf 0x209CC0C
000003A8: push.imm.e 1
000003AC: conv.i.v
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: push.imm.e 0
000003BC: conv.i.v
000003C0: push.imm.e 0
000003C4: conv.i.v
000003C8: push.imm.e 0
000003CC: conv.i.v
000003D0: push.imm.e -1
000003D4: push.imm.e 0
000003D8: push.v obj0.view_wview[array]
000003E0: push.imm.e 1
000003E4: mul.i.v
000003E8: push.global.v global.sca
000003F0: div.v.v
000003F4: push.imm.e 80
000003F8: sub.i.v
000003FC: push.imm.e 30
00000400: conv.i.v
00000404: push.s "Damn! It looks like they destroyed half of the city! As new mayor you must rebuild it before they come back!"
0000040C: conv.s.v
00000410: push.imm.e -1
00000414: push.imm.e 0
00000418: push.v obj0.view_hview[array]
00000420: push.imm.e 1
00000424: mul.i.v
00000428: push.global.v global.sca
00000430: div.v.v
00000434: push.imm.e 280
00000438: sub.i.v
0000043C: push.v went
00000444: sub.v.v
00000448: push.imm.e 50
0000044C: conv.i.v
00000450: call draw_text_ext_colour(argc=10)
00000458: popz
0000045C: push.v phase
00000464: push.imm.e 1
00000468: cmp.i.v ==
0000046C: bf 0x209CCD4
00000470: push.imm.e 1
00000474: conv.i.v
00000478: push.imm.e 0
0000047C: conv.i.v
00000480: push.imm.e 0
00000484: conv.i.v
00000488: push.imm.e 0
0000048C: conv.i.v
00000490: push.imm.e 0
00000494: conv.i.v
00000498: push.imm.e -1
0000049C: push.imm.e 0
000004A0: push.v obj0.view_wview[array]
000004A8: push.imm.e 1
000004AC: mul.i.v
000004B0: push.global.v global.sca
000004B8: div.v.v
000004BC: push.imm.e 80
000004C0: sub.i.v
000004C4: push.imm.e 30
000004C8: conv.i.v
000004CC: push.s "First off, you should demolish those ruins, so that we can build new houses there."
000004D4: conv.s.v
000004D8: push.imm.e -1
000004DC: push.imm.e 0
000004E0: push.v obj0.view_hview[array]
000004E8: push.imm.e 1
000004EC: mul.i.v
000004F0: push.global.v global.sca
000004F8: div.v.v
000004FC: push.imm.e 280
00000500: sub.i.v
00000504: push.v went
0000050C: sub.v.v
00000510: push.imm.e 50
00000514: conv.i.v
00000518: call draw_text_ext_colour(argc=10)
00000520: popz
00000524: push.v phase
0000052C: push.imm.e 2
00000530: cmp.i.v ==
00000534: bf 0x209CD9C
00000538: push.imm.e 1
0000053C: conv.i.v
00000540: push.imm.e 0
00000544: conv.i.v
00000548: push.imm.e 0
0000054C: conv.i.v
00000550: push.imm.e 0
00000554: conv.i.v
00000558: push.imm.e 0
0000055C: conv.i.v
00000560: push.imm.e -1
00000564: push.imm.e 0
00000568: push.v obj0.view_wview[array]
00000570: push.imm.e 1
00000574: mul.i.v
00000578: push.global.v global.sca
00000580: div.v.v
00000584: push.imm.e 80
00000588: sub.i.v
0000058C: push.imm.e 30
00000590: conv.i.v
00000594: push.s "Select the scraper shaped button then click on the ruins to delete them!"
0000059C: conv.s.v
000005A0: push.imm.e -1
000005A4: push.imm.e 0
000005A8: push.v obj0.view_hview[array]
000005B0: push.imm.e 1
000005B4: mul.i.v
000005B8: push.global.v global.sca
000005C0: div.v.v
000005C4: push.imm.e 280
000005C8: sub.i.v
000005CC: push.v went
000005D4: sub.v.v
000005D8: push.imm.e 50
000005DC: conv.i.v
000005E0: call draw_text_ext_colour(argc=10)
000005E8: popz
000005EC: push.v phase
000005F4: push.imm.e 3
000005F8: cmp.i.v ==
000005FC: bf 0x209CE64
00000600: push.imm.e 1
00000604: conv.i.v
00000608: push.imm.e 0
0000060C: conv.i.v
00000610: push.imm.e 0
00000614: conv.i.v
00000618: push.imm.e 0
0000061C: conv.i.v
00000620: push.imm.e 0
00000624: conv.i.v
00000628: push.imm.e -1
0000062C: push.imm.e 0
00000630: push.v obj0.view_wview[array]
00000638: push.imm.e 1
0000063C: mul.i.v
00000640: push.global.v global.sca
00000648: div.v.v
0000064C: push.imm.e 80
00000650: sub.i.v
00000654: push.imm.e 30
00000658: conv.i.v
0000065C: push.s "When you're about to delete a ruin the cost of the operation appears over it!"
00000664: conv.s.v
00000668: push.imm.e -1
0000066C: push.imm.e 0
00000670: push.v obj0.view_hview[array]
00000678: push.imm.e 1
0000067C: mul.i.v
00000680: push.global.v global.sca
00000688: div.v.v
0000068C: push.imm.e 280
00000690: sub.i.v
00000694: push.v went
0000069C: sub.v.v
000006A0: push.imm.e 50
000006A4: conv.i.v
000006A8: call draw_text_ext_colour(argc=10)
000006B0: popz
000006B4: push.v phase
000006BC: push.imm.e 4
000006C0: cmp.i.v ==
000006C4: bf 0x209CF2C
000006C8: push.imm.e 1
000006CC: conv.i.v
000006D0: push.imm.e 0
000006D4: conv.i.v
000006D8: push.imm.e 0
000006DC: conv.i.v
000006E0: push.imm.e 0
000006E4: conv.i.v
000006E8: push.imm.e 0
000006EC: conv.i.v
000006F0: push.imm.e -1
000006F4: push.imm.e 0
000006F8: push.v obj0.view_wview[array]
00000700: push.imm.e 1
00000704: mul.i.v
00000708: push.global.v global.sca
00000710: div.v.v
00000714: push.imm.e 80
00000718: sub.i.v
0000071C: push.imm.e 30
00000720: conv.i.v
00000724: push.s "Building and deleting cost money, of course. You also have to pay for the scaffoldings while the operation is going!"
0000072C: conv.s.v
00000730: push.imm.e -1
00000734: push.imm.e 0
00000738: push.v obj0.view_hview[array]
00000740: push.imm.e 1
00000744: mul.i.v
00000748: push.global.v global.sca
00000750: div.v.v
00000754: push.imm.e 280
00000758: sub.i.v
0000075C: push.v went
00000764: sub.v.v
00000768: push.imm.e 50
0000076C: conv.i.v
00000770: call draw_text_ext_colour(argc=10)
00000778: popz
0000077C: push.v phase
00000784: push.imm.e 5
00000788: cmp.i.v ==
0000078C: bf 0x209CFF4
00000790: push.imm.e 1
00000794: conv.i.v
00000798: push.imm.e 0
0000079C: conv.i.v
000007A0: push.imm.e 0
000007A4: conv.i.v
000007A8: push.imm.e 0
000007AC: conv.i.v
000007B0: push.imm.e 0
000007B4: conv.i.v
000007B8: push.imm.e -1
000007BC: push.imm.e 0
000007C0: push.v obj0.view_wview[array]
000007C8: push.imm.e 1
000007CC: mul.i.v
000007D0: push.global.v global.sca
000007D8: div.v.v
000007DC: push.imm.e 80
000007E0: sub.i.v
000007E4: push.imm.e 30
000007E8: conv.i.v
000007EC: push.s "We collect money by taxing the citizens. You can collect taxes by hoovering with the mouse over those blue icons!"
000007F4: conv.s.v
000007F8: push.imm.e -1
000007FC: push.imm.e 0
00000800: push.v obj0.view_hview[array]
00000808: push.imm.e 1
0000080C: mul.i.v
00000810: push.global.v global.sca
00000818: div.v.v
0000081C: push.imm.e 280
00000820: sub.i.v
00000824: push.v went
0000082C: sub.v.v
00000830: push.imm.e 50
00000834: conv.i.v
00000838: call draw_text_ext_colour(argc=10)
00000840: popz
00000844: push.v phase
0000084C: push.imm.e 6
00000850: cmp.i.v ==
00000854: bf 0x209D0BC
00000858: push.imm.e 1
0000085C: conv.i.v
00000860: push.imm.e 0
00000864: conv.i.v
00000868: push.imm.e 0
0000086C: conv.i.v
00000870: push.imm.e 0
00000874: conv.i.v
00000878: push.imm.e 0
0000087C: conv.i.v
00000880: push.imm.e -1
00000884: push.imm.e 0
00000888: push.v obj0.view_wview[array]
00000890: push.imm.e 1
00000894: mul.i.v
00000898: push.global.v global.sca
000008A0: div.v.v
000008A4: push.imm.e 80
000008A8: sub.i.v
000008AC: push.imm.e 30
000008B0: conv.i.v
000008B4: push.s "When you collect taxes you can see your money amount going up. The top bar gives you in general the amount of resources you own."
000008BC: conv.s.v
000008C0: push.imm.e -1
000008C4: push.imm.e 0
000008C8: push.v obj0.view_hview[array]
000008D0: push.imm.e 1
000008D4: mul.i.v
000008D8: push.global.v global.sca
000008E0: div.v.v
000008E4: push.imm.e 280
000008E8: sub.i.v
000008EC: push.v went
000008F4: sub.v.v
000008F8: push.imm.e 50
000008FC: conv.i.v
00000900: call draw_text_ext_colour(argc=10)
00000908: popz
0000090C: push.v phase
00000914: push.imm.e 7
00000918: cmp.i.v ==
0000091C: bf 0x209D184
00000920: push.imm.e 1
00000924: conv.i.v
00000928: push.imm.e 0
0000092C: conv.i.v
00000930: push.imm.e 0
00000934: conv.i.v
00000938: push.imm.e 0
0000093C: conv.i.v
00000940: push.imm.e 0
00000944: conv.i.v
00000948: push.imm.e -1
0000094C: push.imm.e 0
00000950: push.v obj0.view_wview[array]
00000958: push.imm.e 1
0000095C: mul.i.v
00000960: push.global.v global.sca
00000968: div.v.v
0000096C: push.imm.e 80
00000970: sub.i.v
00000974: push.imm.e 30
00000978: conv.i.v
0000097C: push.s "The bottom bar instead is the Actions Bar. Use the hand button to select items"
00000984: conv.s.v
00000988: push.imm.e -1
0000098C: push.imm.e 0
00000990: push.v obj0.view_hview[array]
00000998: push.imm.e 1
0000099C: mul.i.v
000009A0: push.global.v global.sca
000009A8: div.v.v
000009AC: push.imm.e 280
000009B0: sub.i.v
000009B4: push.v went
000009BC: sub.v.v
000009C0: push.imm.e 50
000009C4: conv.i.v
000009C8: call draw_text_ext_colour(argc=10)
000009D0: popz
000009D4: push.v phase
000009DC: push.imm.e 8
000009E0: cmp.i.v ==
000009E4: bf 0x209D24C
000009E8: push.imm.e 1
000009EC: conv.i.v
000009F0: push.imm.e 0
000009F4: conv.i.v
000009F8: push.imm.e 0
000009FC: conv.i.v
00000A00: push.imm.e 0
00000A04: conv.i.v
00000A08: push.imm.e 0
00000A0C: conv.i.v
00000A10: push.imm.e -1
00000A14: push.imm.e 0
00000A18: push.v obj0.view_wview[array]
00000A20: push.imm.e 1
00000A24: mul.i.v
00000A28: push.global.v global.sca
00000A30: div.v.v
00000A34: push.imm.e 80
00000A38: sub.i.v
00000A3C: push.imm.e 30
00000A40: conv.i.v
00000A44: push.s "The button next to it is the Build button. Now select it and then select the house button, the first one!"
00000A4C: conv.s.v
00000A50: push.imm.e -1
00000A54: push.imm.e 0
00000A58: push.v obj0.view_hview[array]
00000A60: push.imm.e 1
00000A64: mul.i.v
00000A68: push.global.v global.sca
00000A70: div.v.v
00000A74: push.imm.e 280
00000A78: sub.i.v
00000A7C: push.v went
00000A84: sub.v.v
00000A88: push.imm.e 50
00000A8C: conv.i.v
00000A90: call draw_text_ext_colour(argc=10)
00000A98: popz
00000A9C: push.v phase
00000AA4: push.imm.e 9
00000AA8: cmp.i.v ==
00000AAC: bf 0x209D314
00000AB0: push.imm.e 1
00000AB4: conv.i.v
00000AB8: push.imm.e 0
00000ABC: conv.i.v
00000AC0: push.imm.e 0
00000AC4: conv.i.v
00000AC8: push.imm.e 0
00000ACC: conv.i.v
00000AD0: push.imm.e 0
00000AD4: conv.i.v
00000AD8: push.imm.e -1
00000ADC: push.imm.e 0
00000AE0: push.v obj0.view_wview[array]
00000AE8: push.imm.e 1
00000AEC: mul.i.v
00000AF0: push.global.v global.sca
00000AF8: div.v.v
00000AFC: push.imm.e 80
00000B00: sub.i.v
00000B04: push.imm.e 30
00000B08: conv.i.v
00000B0C: push.s "Now build five houses in five empty spots! We need to boost the population in those times of war!"
00000B14: conv.s.v
00000B18: push.imm.e -1
00000B1C: push.imm.e 0
00000B20: push.v obj0.view_hview[array]
00000B28: push.imm.e 1
00000B2C: mul.i.v
00000B30: push.global.v global.sca
00000B38: div.v.v
00000B3C: push.imm.e 280
00000B40: sub.i.v
00000B44: push.v went
00000B4C: sub.v.v
00000B50: push.imm.e 50
00000B54: conv.i.v
00000B58: call draw_text_ext_colour(argc=10)
00000B60: popz
00000B64: push.v phase
00000B6C: push.imm.e 10
00000B70: cmp.i.v ==
00000B74: bf 0x209D3DC
00000B78: push.imm.e 1
00000B7C: conv.i.v
00000B80: push.imm.e 0
00000B84: conv.i.v
00000B88: push.imm.e 0
00000B8C: conv.i.v
00000B90: push.imm.e 0
00000B94: conv.i.v
00000B98: push.imm.e 0
00000B9C: conv.i.v
00000BA0: push.imm.e -1
00000BA4: push.imm.e 0
00000BA8: push.v obj0.view_wview[array]
00000BB0: push.imm.e 1
00000BB4: mul.i.v
00000BB8: push.global.v global.sca
00000BC0: div.v.v
00000BC4: push.imm.e 80
00000BC8: sub.i.v
00000BCC: push.imm.e 30
00000BD0: conv.i.v
00000BD4: push.s "When a house is completed immediately the population grows, but also the energy consumption! Houses' population keeps growing over time"
00000BDC: conv.s.v
00000BE0: push.imm.e -1
00000BE4: push.imm.e 0
00000BE8: push.v obj0.view_hview[array]
00000BF0: push.imm.e 1
00000BF4: mul.i.v
00000BF8: push.global.v global.sca
00000C00: div.v.v
00000C04: push.imm.e 280
00000C08: sub.i.v
00000C0C: push.v went
00000C14: sub.v.v
00000C18: push.imm.e 50
00000C1C: conv.i.v
00000C20: call draw_text_ext_colour(argc=10)
00000C28: popz
00000C2C: push.v phase
00000C34: push.imm.e 11
00000C38: cmp.i.v ==
00000C3C: bf 0x209D4A4
00000C40: push.imm.e 1
00000C44: conv.i.v
00000C48: push.imm.e 0
00000C4C: conv.i.v
00000C50: push.imm.e 0
00000C54: conv.i.v
00000C58: push.imm.e 0
00000C5C: conv.i.v
00000C60: push.imm.e 0
00000C64: conv.i.v
00000C68: push.imm.e -1
00000C6C: push.imm.e 0
00000C70: push.v obj0.view_wview[array]
00000C78: push.imm.e 1
00000C7C: mul.i.v
00000C80: push.global.v global.sca
00000C88: div.v.v
00000C8C: push.imm.e 80
00000C90: sub.i.v
00000C94: push.imm.e 30
00000C98: conv.i.v
00000C9C: push.s "To provide energy to the city we use power plants. If the energy drops below zero, our citizens will stop paying taxes!"
00000CA4: conv.s.v
00000CA8: push.imm.e -1
00000CAC: push.imm.e 0
00000CB0: push.v obj0.view_hview[array]
00000CB8: push.imm.e 1
00000CBC: mul.i.v
00000CC0: push.global.v global.sca
00000CC8: div.v.v
00000CCC: push.imm.e 280
00000CD0: sub.i.v
00000CD4: push.v went
00000CDC: sub.v.v
00000CE0: push.imm.e 50
00000CE4: conv.i.v
00000CE8: call draw_text_ext_colour(argc=10)
00000CF0: popz
00000CF4: push.v phase
00000CFC: push.imm.e 12
00000D00: cmp.i.v ==
00000D04: bf 0x209D56C
00000D08: push.imm.e 1
00000D0C: conv.i.v
00000D10: push.imm.e 0
00000D14: conv.i.v
00000D18: push.imm.e 0
00000D1C: conv.i.v
00000D20: push.imm.e 0
00000D24: conv.i.v
00000D28: push.imm.e 0
00000D2C: conv.i.v
00000D30: push.imm.e -1
00000D34: push.imm.e 0
00000D38: push.v obj0.view_wview[array]
00000D40: push.imm.e 1
00000D44: mul.i.v
00000D48: push.global.v global.sca
00000D50: div.v.v
00000D54: push.imm.e 80
00000D58: sub.i.v
00000D5C: push.imm.e 30
00000D60: conv.i.v
00000D64: push.s "Now build a power plant in an empty spot! Remember that energy consumption depends on population, so it will grow continuously"
00000D6C: conv.s.v
00000D70: push.imm.e -1
00000D74: push.imm.e 0
00000D78: push.v obj0.view_hview[array]
00000D80: push.imm.e 1
00000D84: mul.i.v
00000D88: push.global.v global.sca
00000D90: div.v.v
00000D94: push.imm.e 280
00000D98: sub.i.v
00000D9C: push.v went
00000DA4: sub.v.v
00000DA8: push.imm.e 50
00000DAC: conv.i.v
00000DB0: call draw_text_ext_colour(argc=10)
00000DB8: popz
00000DBC: push.v phase
00000DC4: push.imm.e 13
00000DC8: cmp.i.v ==
00000DCC: bf 0x209D634
00000DD0: push.imm.e 1
00000DD4: conv.i.v
00000DD8: push.imm.e 0
00000DDC: conv.i.v
00000DE0: push.imm.e 0
00000DE4: conv.i.v
00000DE8: push.imm.e 0
00000DEC: conv.i.v
00000DF0: push.imm.e 0
00000DF4: conv.i.v
00000DF8: push.imm.e -1
00000DFC: push.imm.e 0
00000E00: push.v obj0.view_wview[array]
00000E08: push.imm.e 1
00000E0C: mul.i.v
00000E10: push.global.v global.sca
00000E18: div.v.v
00000E1C: push.imm.e 80
00000E20: sub.i.v
00000E24: push.imm.e 30
00000E28: conv.i.v
00000E2C: push.s "We also need to provide some clean air and amusement to them, and to do so you can build parks"
00000E34: conv.s.v
00000E38: push.imm.e -1
00000E3C: push.imm.e 0
00000E40: push.v obj0.view_hview[array]
00000E48: push.imm.e 1
00000E4C: mul.i.v
00000E50: push.global.v global.sca
00000E58: div.v.v
00000E5C: push.imm.e 280
00000E60: sub.i.v
00000E64: push.v went
00000E6C: sub.v.v
00000E70: push.imm.e 50
00000E74: conv.i.v
00000E78: call draw_text_ext_colour(argc=10)
00000E80: popz
00000E84: push.v phase
00000E8C: push.imm.e 14
00000E90: cmp.i.v ==
00000E94: bf 0x209D6FC
00000E98: push.imm.e 1
00000E9C: conv.i.v
00000EA0: push.imm.e 0
00000EA4: conv.i.v
00000EA8: push.imm.e 0
00000EAC: conv.i.v
00000EB0: push.imm.e 0
00000EB4: conv.i.v
00000EB8: push.imm.e 0
00000EBC: conv.i.v
00000EC0: push.imm.e -1
00000EC4: push.imm.e 0
00000EC8: push.v obj0.view_wview[array]
00000ED0: push.imm.e 1
00000ED4: mul.i.v
00000ED8: push.global.v global.sca
00000EE0: div.v.v
00000EE4: push.imm.e 80
00000EE8: sub.i.v
00000EEC: push.imm.e 30
00000EF0: conv.i.v
00000EF4: push.s "Notice that the more the population and power plants grow the more they will need parks!"
00000EFC: conv.s.v
00000F00: push.imm.e -1
00000F04: push.imm.e 0
00000F08: push.v obj0.view_hview[array]
00000F10: push.imm.e 1
00000F14: mul.i.v
00000F18: push.global.v global.sca
00000F20: div.v.v
00000F24: push.imm.e 280
00000F28: sub.i.v
00000F2C: push.v went
00000F34: sub.v.v
00000F38: push.imm.e 50
00000F3C: conv.i.v
00000F40: call draw_text_ext_colour(argc=10)
00000F48: popz
00000F4C: push.v phase
00000F54: push.imm.e 15
00000F58: cmp.i.v ==
00000F5C: bf 0x209D7C4
00000F60: push.imm.e 1
00000F64: conv.i.v
00000F68: push.imm.e 0
00000F6C: conv.i.v
00000F70: push.imm.e 0
00000F74: conv.i.v
00000F78: push.imm.e 0
00000F7C: conv.i.v
00000F80: push.imm.e 0
00000F84: conv.i.v
00000F88: push.imm.e -1
00000F8C: push.imm.e 0
00000F90: push.v obj0.view_wview[array]
00000F98: push.imm.e 1
00000F9C: mul.i.v
00000FA0: push.global.v global.sca
00000FA8: div.v.v
00000FAC: push.imm.e 80
00000FB0: sub.i.v
00000FB4: push.imm.e 30
00000FB8: conv.i.v
00000FBC: push.s "Also notice that at night buildings consume much more energy!"
00000FC4: conv.s.v
00000FC8: push.imm.e -1
00000FCC: push.imm.e 0
00000FD0: push.v obj0.view_hview[array]
00000FD8: push.imm.e 1
00000FDC: mul.i.v
00000FE0: push.global.v global.sca
00000FE8: div.v.v
00000FEC: push.imm.e 280
00000FF0: sub.i.v
00000FF4: push.v went
00000FFC: sub.v.v
00001000: push.imm.e 50
00001004: conv.i.v
00001008: call draw_text_ext_colour(argc=10)
00001010: popz
00001014: push.v phase
0000101C: push.imm.e 16
00001020: cmp.i.v ==
00001024: bf 0x209D88C
00001028: push.imm.e 1
0000102C: conv.i.v
00001030: push.imm.e 0
00001034: conv.i.v
00001038: push.imm.e 0
0000103C: conv.i.v
00001040: push.imm.e 0
00001044: conv.i.v
00001048: push.imm.e 0
0000104C: conv.i.v
00001050: push.imm.e -1
00001054: push.imm.e 0
00001058: push.v obj0.view_wview[array]
00001060: push.imm.e 1
00001064: mul.i.v
00001068: push.global.v global.sca
00001070: div.v.v
00001074: push.imm.e 80
00001078: sub.i.v
0000107C: push.imm.e 30
00001080: conv.i.v
00001084: push.s "Now build a park in an empty spot. Remember that parks are cheap and fast to build but very expensive in manteinance!"
0000108C: conv.s.v
00001090: push.imm.e -1
00001094: push.imm.e 0
00001098: push.v obj0.view_hview[array]
000010A0: push.imm.e 1
000010A4: mul.i.v
000010A8: push.global.v global.sca
000010B0: div.v.v
000010B4: push.imm.e 280
000010B8: sub.i.v
000010BC: push.v went
000010C4: sub.v.v
000010C8: push.imm.e 50
000010CC: conv.i.v
000010D0: call draw_text_ext_colour(argc=10)
000010D8: popz
000010DC: push.v phase
000010E4: push.imm.e 17
000010E8: cmp.i.v ==
000010EC: bf 0x209D954
000010F0: push.imm.e 1
000010F4: conv.i.v
000010F8: push.imm.e 0
000010FC: conv.i.v
00001100: push.imm.e 0
00001104: conv.i.v
00001108: push.imm.e 0
0000110C: conv.i.v
00001110: push.imm.e 0
00001114: conv.i.v
00001118: push.imm.e -1
0000111C: push.imm.e 0
00001120: push.v obj0.view_wview[array]
00001128: push.imm.e 1
0000112C: mul.i.v
00001130: push.global.v global.sca
00001138: div.v.v
0000113C: push.imm.e 80
00001140: sub.i.v
00001144: push.imm.e 30
00001148: conv.i.v
0000114C: push.s "If you have enough parks you will see an happy face next to the resources count, otherwise yes, they will stop paying taxes!"
00001154: conv.s.v
00001158: push.imm.e -1
0000115C: push.imm.e 0
00001160: push.v obj0.view_hview[array]
00001168: push.imm.e 1
0000116C: mul.i.v
00001170: push.global.v global.sca
00001178: div.v.v
0000117C: push.imm.e 280
00001180: sub.i.v
00001184: push.v went
0000118C: sub.v.v
00001190: push.imm.e 50
00001194: conv.i.v
00001198: call draw_text_ext_colour(argc=10)
000011A0: popz
000011A4: push.v phase
000011AC: push.imm.e 18
000011B0: cmp.i.v ==
000011B4: bf 0x209DA1C
000011B8: push.imm.e 1
000011BC: conv.i.v
000011C0: push.imm.e 0
000011C4: conv.i.v
000011C8: push.imm.e 0
000011CC: conv.i.v
000011D0: push.imm.e 0
000011D4: conv.i.v
000011D8: push.imm.e 0
000011DC: conv.i.v
000011E0: push.imm.e -1
000011E4: push.imm.e 0
000011E8: push.v obj0.view_wview[array]
000011F0: push.imm.e 1
000011F4: mul.i.v
000011F8: push.global.v global.sca
00001200: div.v.v
00001204: push.imm.e 80
00001208: sub.i.v
0000120C: push.imm.e 30
00001210: conv.i.v
00001214: push.s "The defense of the city is another crucial point. As you can see we use massive artillery to keep the city safe!"
0000121C: conv.s.v
00001220: push.imm.e -1
00001224: push.imm.e 0
00001228: push.v obj0.view_hview[array]
00001230: push.imm.e 1
00001234: mul.i.v
00001238: push.global.v global.sca
00001240: div.v.v
00001244: push.imm.e 280
00001248: sub.i.v
0000124C: push.v went
00001254: sub.v.v
00001258: push.imm.e 50
0000125C: conv.i.v
00001260: call draw_text_ext_colour(argc=10)
00001268: popz
0000126C: push.v phase
00001274: push.imm.e 19
00001278: cmp.i.v ==
0000127C: bf 0x209DAE4
00001280: push.imm.e 1
00001284: conv.i.v
00001288: push.imm.e 0
0000128C: conv.i.v
00001290: push.imm.e 0
00001294: conv.i.v
00001298: push.imm.e 0
0000129C: conv.i.v
000012A0: push.imm.e 0
000012A4: conv.i.v
000012A8: push.imm.e -1
000012AC: push.imm.e 0
000012B0: push.v obj0.view_wview[array]
000012B8: push.imm.e 1
000012BC: mul.i.v
000012C0: push.global.v global.sca
000012C8: div.v.v
000012CC: push.imm.e 80
000012D0: sub.i.v
000012D4: push.imm.e 30
000012D8: conv.i.v
000012DC: push.s "Build a rocket launcher in an empty spot. Remember that you can't build them too close at it would be too dangerous!"
000012E4: conv.s.v
000012E8: push.imm.e -1
000012EC: push.imm.e 0
000012F0: push.v obj0.view_hview[array]
000012F8: push.imm.e 1
000012FC: mul.i.v
00001300: push.global.v global.sca
00001308: div.v.v
0000130C: push.imm.e 280
00001310: sub.i.v
00001314: push.v went
0000131C: sub.v.v
00001320: push.imm.e 50
00001324: conv.i.v
00001328: call draw_text_ext_colour(argc=10)
00001330: popz
00001334: push.v phase
0000133C: push.imm.e 20
00001340: cmp.i.v ==
00001344: bf 0x209DBAC
00001348: push.imm.e 1
0000134C: conv.i.v
00001350: push.imm.e 0
00001354: conv.i.v
00001358: push.imm.e 0
0000135C: conv.i.v
00001360: push.imm.e 0
00001364: conv.i.v
00001368: push.imm.e 0
0000136C: conv.i.v
00001370: push.imm.e -1
00001374: push.imm.e 0
00001378: push.v obj0.view_wview[array]
00001380: push.imm.e 1
00001384: mul.i.v
00001388: push.global.v global.sca
00001390: div.v.v
00001394: push.imm.e 80
00001398: sub.i.v
0000139C: push.imm.e 30
000013A0: conv.i.v
000013A4: push.s "We use weapons also to gather resources from our enemy, that carry them in those huge balloons you see flying above us!"
000013AC: conv.s.v
000013B0: push.imm.e -1
000013B4: push.imm.e 0
000013B8: push.v obj0.view_hview[array]
000013C0: push.imm.e 1
000013C4: mul.i.v
000013C8: push.global.v global.sca
000013D0: div.v.v
000013D4: push.imm.e 280
000013D8: sub.i.v
000013DC: push.v went
000013E4: sub.v.v
000013E8: push.imm.e 50
000013EC: conv.i.v
000013F0: call draw_text_ext_colour(argc=10)
000013F8: popz
000013FC: push.v phase
00001404: push.imm.e 21
00001408: cmp.i.v ==
0000140C: bf 0x209DC74
00001410: push.imm.e 1
00001414: conv.i.v
00001418: push.imm.e 0
0000141C: conv.i.v
00001420: push.imm.e 0
00001424: conv.i.v
00001428: push.imm.e 0
0000142C: conv.i.v
00001430: push.imm.e 0
00001434: conv.i.v
00001438: push.imm.e -1
0000143C: push.imm.e 0
00001440: push.v obj0.view_wview[array]
00001448: push.imm.e 1
0000144C: mul.i.v
00001450: push.global.v global.sca
00001458: div.v.v
0000145C: push.imm.e 80
00001460: sub.i.v
00001464: push.imm.e 30
00001468: conv.i.v
0000146C: push.s "Yes, I know what you are thinking and yes, NIMBUS grew stealing oil to foreign nations, but what can you do?"
00001474: conv.s.v
00001478: push.imm.e -1
0000147C: push.imm.e 0
00001480: push.v obj0.view_hview[array]
00001488: push.imm.e 1
0000148C: mul.i.v
00001490: push.global.v global.sca
00001498: div.v.v
0000149C: push.imm.e 280
000014A0: sub.i.v
000014A4: push.v went
000014AC: sub.v.v
000014B0: push.imm.e 50
000014B4: conv.i.v
000014B8: call draw_text_ext_colour(argc=10)
000014C0: popz
000014C4: push.v phase
000014CC: push.imm.e 22
000014D0: cmp.i.v ==
000014D4: bf 0x209DD3C
000014D8: push.imm.e 1
000014DC: conv.i.v
000014E0: push.imm.e 0
000014E4: conv.i.v
000014E8: push.imm.e 0
000014EC: conv.i.v
000014F0: push.imm.e 0
000014F4: conv.i.v
000014F8: push.imm.e 0
000014FC: conv.i.v
00001500: push.imm.e -1
00001504: push.imm.e 0
00001508: push.v obj0.view_wview[array]
00001510: push.imm.e 1
00001514: mul.i.v
00001518: push.global.v global.sca
00001520: div.v.v
00001524: push.imm.e 80
00001528: sub.i.v
0000152C: push.imm.e 30
00001530: conv.i.v
00001534: push.s "When a balloon is aproaching, click to the closest weapon to destroy it, then quickly collect the resource falling from the sky!"
0000153C: conv.s.v
00001540: push.imm.e -1
00001544: push.imm.e 0
00001548: push.v obj0.view_hview[array]
00001550: push.imm.e 1
00001554: mul.i.v
00001558: push.global.v global.sca
00001560: div.v.v
00001564: push.imm.e 280
00001568: sub.i.v
0000156C: push.v went
00001574: sub.v.v
00001578: push.imm.e 50
0000157C: conv.i.v
00001580: call draw_text_ext_colour(argc=10)
00001588: popz
0000158C: push.v phase
00001594: push.imm.e 23
00001598: cmp.i.v ==
0000159C: bf 0x209DE04
000015A0: push.imm.e 1
000015A4: conv.i.v
000015A8: push.imm.e 0
000015AC: conv.i.v
000015B0: push.imm.e 0
000015B4: conv.i.v
000015B8: push.imm.e 0
000015BC: conv.i.v
000015C0: push.imm.e 0
000015C4: conv.i.v
000015C8: push.imm.e -1
000015CC: push.imm.e 0
000015D0: push.v obj0.view_wview[array]
000015D8: push.imm.e 1
000015DC: mul.i.v
000015E0: push.global.v global.sca
000015E8: div.v.v
000015EC: push.imm.e 80
000015F0: sub.i.v
000015F4: push.imm.e 30
000015F8: conv.i.v
000015FC: push.s "Green balloons are the ones carrying oil. They are the most common ones!"
00001604: conv.s.v
00001608: push.imm.e -1
0000160C: push.imm.e 0
00001610: push.v obj0.view_hview[array]
00001618: push.imm.e 1
0000161C: mul.i.v
00001620: push.global.v global.sca
00001628: div.v.v
0000162C: push.imm.e 280
00001630: sub.i.v
00001634: push.v went
0000163C: sub.v.v
00001640: push.imm.e 50
00001644: conv.i.v
00001648: call draw_text_ext_colour(argc=10)
00001650: popz
00001654: push.v phase
0000165C: push.imm.e 24
00001660: cmp.i.v ==
00001664: bf 0x209DECC
00001668: push.imm.e 1
0000166C: conv.i.v
00001670: push.imm.e 0
00001674: conv.i.v
00001678: push.imm.e 0
0000167C: conv.i.v
00001680: push.imm.e 0
00001684: conv.i.v
00001688: push.imm.e 0
0000168C: conv.i.v
00001690: push.imm.e -1
00001694: push.imm.e 0
00001698: push.v obj0.view_wview[array]
000016A0: push.imm.e 1
000016A4: mul.i.v
000016A8: push.global.v global.sca
000016B0: div.v.v
000016B4: push.imm.e 80
000016B8: sub.i.v
000016BC: push.imm.e 30
000016C0: conv.i.v
000016C4: push.s "Power plants and the city's engines burn oil to run. The more the city weights the more consumes oil!"
000016CC: conv.s.v
000016D0: push.imm.e -1
000016D4: push.imm.e 0
000016D8: push.v obj0.view_hview[array]
000016E0: push.imm.e 1
000016E4: mul.i.v
000016E8: push.global.v global.sca
000016F0: div.v.v
000016F4: push.imm.e 280
000016F8: sub.i.v
000016FC: push.v went
00001704: sub.v.v
00001708: push.imm.e 50
0000170C: conv.i.v
00001710: call draw_text_ext_colour(argc=10)
00001718: popz
0000171C: push.v phase
00001724: push.imm.e 25
00001728: cmp.i.v ==
0000172C: bf 0x209DF94
00001730: push.imm.e 1
00001734: conv.i.v
00001738: push.imm.e 0
0000173C: conv.i.v
00001740: push.imm.e 0
00001744: conv.i.v
00001748: push.imm.e 0
0000174C: conv.i.v
00001750: push.imm.e 0
00001754: conv.i.v
00001758: push.imm.e -1
0000175C: push.imm.e 0
00001760: push.v obj0.view_wview[array]
00001768: push.imm.e 1
0000176C: mul.i.v
00001770: push.global.v global.sca
00001778: div.v.v
0000177C: push.imm.e 80
00001780: sub.i.v
00001784: push.imm.e 30
00001788: conv.i.v
0000178C: push.s "So remember not to build unnecessary stuff or too many power plants or the city will fall to the ground!"
00001794: conv.s.v
00001798: push.imm.e -1
0000179C: push.imm.e 0
000017A0: push.v obj0.view_hview[array]
000017A8: push.imm.e 1
000017AC: mul.i.v
000017B0: push.global.v global.sca
000017B8: div.v.v
000017BC: push.imm.e 280
000017C0: sub.i.v
000017C4: push.v went
000017CC: sub.v.v
000017D0: push.imm.e 50
000017D4: conv.i.v
000017D8: call draw_text_ext_colour(argc=10)
000017E0: popz
000017E4: push.v phase
000017EC: push.imm.e 26
000017F0: cmp.i.v ==
000017F4: bf 0x209E05C
000017F8: push.imm.e 1
000017FC: conv.i.v
00001800: push.imm.e 0
00001804: conv.i.v
00001808: push.imm.e 0
0000180C: conv.i.v
00001810: push.imm.e 0
00001814: conv.i.v
00001818: push.imm.e 0
0000181C: conv.i.v
00001820: push.imm.e -1
00001824: push.imm.e 0
00001828: push.v obj0.view_wview[array]
00001830: push.imm.e 1
00001834: mul.i.v
00001838: push.global.v global.sca
00001840: div.v.v
00001844: push.imm.e 80
00001848: sub.i.v
0000184C: push.imm.e 30
00001850: conv.i.v
00001854: push.s "Yellow balloons carry batteries for energy and blue ones carry money deposits."
0000185C: conv.s.v
00001860: push.imm.e -1
00001864: push.imm.e 0
00001868: push.v obj0.view_hview[array]
00001870: push.imm.e 1
00001874: mul.i.v
00001878: push.global.v global.sca
00001880: div.v.v
00001884: push.imm.e 280
00001888: sub.i.v
0000188C: push.v went
00001894: sub.v.v
00001898: push.imm.e 50
0000189C: conv.i.v
000018A0: call draw_text_ext_colour(argc=10)
000018A8: popz
000018AC: push.v phase
000018B4: push.imm.e 27
000018B8: cmp.i.v ==
000018BC: bf 0x209E124
000018C0: push.imm.e 1
000018C4: conv.i.v
000018C8: push.imm.e 0
000018CC: conv.i.v
000018D0: push.imm.e 0
000018D4: conv.i.v
000018D8: push.imm.e 0
000018DC: conv.i.v
000018E0: push.imm.e 0
000018E4: conv.i.v
000018E8: push.imm.e -1
000018EC: push.imm.e 0
000018F0: push.v obj0.view_wview[array]
000018F8: push.imm.e 1
000018FC: mul.i.v
00001900: push.global.v global.sca
00001908: div.v.v
0000190C: push.imm.e 80
00001910: sub.i.v
00001914: push.imm.e 30
00001918: conv.i.v
0000191C: push.s "Red balloons are sent by the enemy to spy on us, so you absolutely have to destroy them!"
00001924: conv.s.v
00001928: push.imm.e -1
0000192C: push.imm.e 0
00001930: push.v obj0.view_hview[array]
00001938: push.imm.e 1
0000193C: mul.i.v
00001940: push.global.v global.sca
00001948: div.v.v
0000194C: push.imm.e 280
00001950: sub.i.v
00001954: push.v went
0000195C: sub.v.v
00001960: push.imm.e 50
00001964: conv.i.v
00001968: call draw_text_ext_colour(argc=10)
00001970: popz
00001974: push.v phase
0000197C: push.imm.e 28
00001980: cmp.i.v ==
00001984: bf 0x209E1EC
00001988: push.imm.e 1
0000198C: conv.i.v
00001990: push.imm.e 0
00001994: conv.i.v
00001998: push.imm.e 0
0000199C: conv.i.v
000019A0: push.imm.e 0
000019A4: conv.i.v
000019A8: push.imm.e 0
000019AC: conv.i.v
000019B0: push.imm.e -1
000019B4: push.imm.e 0
000019B8: push.v obj0.view_wview[array]
000019C0: push.imm.e 1
000019C4: mul.i.v
000019C8: push.global.v global.sca
000019D0: div.v.v
000019D4: push.imm.e 80
000019D8: sub.i.v
000019DC: push.imm.e 30
000019E0: conv.i.v
000019E4: push.s "If you don't do it they will call reinforcements and you will experience an attack like the one you saw before!"
000019EC: conv.s.v
000019F0: push.imm.e -1
000019F4: push.imm.e 0
000019F8: push.v obj0.view_hview[array]
00001A00: push.imm.e 1
00001A04: mul.i.v
00001A08: push.global.v global.sca
00001A10: div.v.v
00001A14: push.imm.e 280
00001A18: sub.i.v
00001A1C: push.v went
00001A24: sub.v.v
00001A28: push.imm.e 50
00001A2C: conv.i.v
00001A30: call draw_text_ext_colour(argc=10)
00001A38: popz
00001A3C: push.v phase
00001A44: push.imm.e 29
00001A48: cmp.i.v ==
00001A4C: bf 0x209E2B4
00001A50: push.imm.e 1
00001A54: conv.i.v
00001A58: push.imm.e 0
00001A5C: conv.i.v
00001A60: push.imm.e 0
00001A64: conv.i.v
00001A68: push.imm.e 0
00001A6C: conv.i.v
00001A70: push.imm.e 0
00001A74: conv.i.v
00001A78: push.imm.e -1
00001A7C: push.imm.e 0
00001A80: push.v obj0.view_wview[array]
00001A88: push.imm.e 1
00001A8C: mul.i.v
00001A90: push.global.v global.sca
00001A98: div.v.v
00001A9C: push.imm.e 80
00001AA0: sub.i.v
00001AA4: push.imm.e 30
00001AA8: conv.i.v
00001AAC: push.s "I think they will not stop until we build something very big to demonstrate them we belong here!"
00001AB4: conv.s.v
00001AB8: push.imm.e -1
00001ABC: push.imm.e 0
00001AC0: push.v obj0.view_hview[array]
00001AC8: push.imm.e 1
00001ACC: mul.i.v
00001AD0: push.global.v global.sca
00001AD8: div.v.v
00001ADC: push.imm.e 280
00001AE0: sub.i.v
00001AE4: push.v went
00001AEC: sub.v.v
00001AF0: push.imm.e 50
00001AF4: conv.i.v
00001AF8: call draw_text_ext_colour(argc=10)
00001B00: popz
00001B04: push.v phase
00001B0C: push.imm.e 30
00001B10: cmp.i.v ==
00001B14: bf 0x209E37C
00001B18: push.imm.e 1
00001B1C: conv.i.v
00001B20: push.imm.e 0
00001B24: conv.i.v
00001B28: push.imm.e 0
00001B2C: conv.i.v
00001B30: push.imm.e 0
00001B34: conv.i.v
00001B38: push.imm.e 0
00001B3C: conv.i.v
00001B40: push.imm.e -1
00001B44: push.imm.e 0
00001B48: push.v obj0.view_wview[array]
00001B50: push.imm.e 1
00001B54: mul.i.v
00001B58: push.global.v global.sca
00001B60: div.v.v
00001B64: push.imm.e 80
00001B68: sub.i.v
00001B6C: push.imm.e 30
00001B70: conv.i.v
00001B74: push.s "In some time your city will become bigger and it will be difficult to control it all in a glance!"
00001B7C: conv.s.v
00001B80: push.imm.e -1
00001B84: push.imm.e 0
00001B88: push.v obj0.view_hview[array]
00001B90: push.imm.e 1
00001B94: mul.i.v
00001B98: push.global.v global.sca
00001BA0: div.v.v
00001BA4: push.imm.e 280
00001BA8: sub.i.v
00001BAC: push.v went
00001BB4: sub.v.v
00001BB8: push.imm.e 50
00001BBC: conv.i.v
00001BC0: call draw_text_ext_colour(argc=10)
00001BC8: popz
00001BCC: push.v phase
00001BD4: push.imm.e 31
00001BD8: cmp.i.v ==
00001BDC: bf 0x209E444
00001BE0: push.imm.e 1
00001BE4: conv.i.v
00001BE8: push.imm.e 0
00001BEC: conv.i.v
00001BF0: push.imm.e 0
00001BF4: conv.i.v
00001BF8: push.imm.e 0
00001BFC: conv.i.v
00001C00: push.imm.e 0
00001C04: conv.i.v
00001C08: push.imm.e -1
00001C0C: push.imm.e 0
00001C10: push.v obj0.view_wview[array]
00001C18: push.imm.e 1
00001C1C: mul.i.v
00001C20: push.global.v global.sca
00001C28: div.v.v
00001C2C: push.imm.e 80
00001C30: sub.i.v
00001C34: push.imm.e 30
00001C38: conv.i.v
00001C3C: push.s "You can use the view buttons to quickly see the new zones you'll build and to zoom in and out!"
00001C44: conv.s.v
00001C48: push.imm.e -1
00001C4C: push.imm.e 0
00001C50: push.v obj0.view_hview[array]
00001C58: push.imm.e 1
00001C5C: mul.i.v
00001C60: push.global.v global.sca
00001C68: div.v.v
00001C6C: push.imm.e 280
00001C70: sub.i.v
00001C74: push.v went
00001C7C: sub.v.v
00001C80: push.imm.e 50
00001C84: conv.i.v
00001C88: call draw_text_ext_colour(argc=10)
00001C90: popz
00001C94: push.v phase
00001C9C: push.imm.e 32
00001CA0: cmp.i.v ==
00001CA4: bf 0x209E5E8
00001CA8: push.builtin.v os_type
00001CB0: push.imm.e 0
00001CB4: cmp.i.v ==
00001CB8: bf 0x209E520
00001CBC: push.imm.e 1
00001CC0: conv.i.v
00001CC4: push.imm.e 0
00001CC8: conv.i.v
00001CCC: push.imm.e 0
00001CD0: conv.i.v
00001CD4: push.imm.e 0
00001CD8: conv.i.v
00001CDC: push.imm.e 0
00001CE0: conv.i.v
00001CE4: push.imm.e -1
00001CE8: push.imm.e 0
00001CEC: push.v obj0.view_wview[array]
00001CF4: push.imm.e 1
00001CF8: mul.i.v
00001CFC: push.global.v global.sca
00001D04: div.v.v
00001D08: push.imm.e 80
00001D0C: sub.i.v
00001D10: push.imm.e 30
00001D14: conv.i.v
00001D18: push.s "You can also use the right mouse button to move the view and the mouse wheel for the zoom controls!"
00001D20: conv.s.v
00001D24: push.imm.e -1
00001D28: push.imm.e 0
00001D2C: push.v obj0.view_hview[array]
00001D34: push.imm.e 1
00001D38: mul.i.v
00001D3C: push.global.v global.sca
00001D44: div.v.v
00001D48: push.imm.e 280
00001D4C: sub.i.v
00001D50: push.v went
00001D58: sub.v.v
00001D5C: push.imm.e 50
00001D60: conv.i.v
00001D64: call draw_text_ext_colour(argc=10)
00001D6C: popz
00001D70: push.builtin.v os_type
00001D78: push.imm.e 4
00001D7C: cmp.i.v ==
00001D80: bf 0x209E5E8
00001D84: push.imm.e 1
00001D88: conv.i.v
00001D8C: push.imm.e 0
00001D90: conv.i.v
00001D94: push.imm.e 0
00001D98: conv.i.v
00001D9C: push.imm.e 0
00001DA0: conv.i.v
00001DA4: push.imm.e 0
00001DA8: conv.i.v
00001DAC: push.imm.e -1
00001DB0: push.imm.e 0
00001DB4: push.v obj0.view_wview[array]
00001DBC: push.imm.e 1
00001DC0: mul.i.v
00001DC4: push.global.v global.sca
00001DCC: div.v.v
00001DD0: push.imm.e 80
00001DD4: sub.i.v
00001DD8: push.imm.e 30
00001DDC: conv.i.v
00001DE0: push.s "You can also swipe with your finger to move the view of the map!"
00001DE8: conv.s.v
00001DEC: push.imm.e -1
00001DF0: push.imm.e 0
00001DF4: push.v obj0.view_hview[array]
00001DFC: push.imm.e 1
00001E00: mul.i.v
00001E04: push.global.v global.sca
00001E0C: div.v.v
00001E10: push.imm.e 280
00001E14: sub.i.v
00001E18: push.v went
00001E20: sub.v.v
00001E24: push.imm.e 50
00001E28: conv.i.v
00001E2C: call draw_text_ext_colour(argc=10)
00001E34: popz
00001E38: push.v phase
00001E40: push.imm.e 33
00001E44: cmp.i.v ==
00001E48: bf 0x209E6B0
00001E4C: push.imm.e 1
00001E50: conv.i.v
00001E54: push.imm.e 0
00001E58: conv.i.v
00001E5C: push.imm.e 0
00001E60: conv.i.v
00001E64: push.imm.e 0
00001E68: conv.i.v
00001E6C: push.imm.e 0
00001E70: conv.i.v
00001E74: push.imm.e -1
00001E78: push.imm.e 0
00001E7C: push.v obj0.view_wview[array]
00001E84: push.imm.e 1
00001E88: mul.i.v
00001E8C: push.global.v global.sca
00001E94: div.v.v
00001E98: push.imm.e 80
00001E9C: sub.i.v
00001EA0: push.imm.e 30
00001EA4: conv.i.v
00001EA8: push.s "Well, it looks like you know how to move around now! Good luck with your own NIMBUS platform!"
00001EB0: conv.s.v
00001EB4: push.imm.e -1
00001EB8: push.imm.e 0
00001EBC: push.v obj0.view_hview[array]
00001EC4: push.imm.e 1
00001EC8: mul.i.v
00001ECC: push.global.v global.sca
00001ED4: div.v.v
00001ED8: push.imm.e 280
00001EDC: sub.i.v
00001EE0: push.v went
00001EE8: sub.v.v
00001EEC: push.imm.e 50
00001EF0: conv.i.v
00001EF4: call draw_text_ext_colour(argc=10)
00001EFC: popz