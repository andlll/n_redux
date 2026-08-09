// gml_Object_scroller2_Step_0  locals=2 args=0 len=3148
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v goer
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C0730
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e -1
00000058: push.imm.e 0
0000005C: push.v obj0.view_yview[array]
00000064: push.imm.e -1
00000068: push.imm.e 0
0000006C: push.v obj0.view_hview[array]
00000074: add.v.v
00000078: push.imm.e 100
0000007C: sub.i.v
00000080: push.builtin.v mouse_y
00000088: call action_if_variable(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x20C0730
000000A8: push.imm.e 4
000000AC: conv.i.v
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.imm.e -1
000000BC: push.imm.e 0
000000C0: push.v obj0.view_xview[array]
000000C8: call action_if_variable(argc=3)
000000D0: pop.v.v local.__b__
000000D8: push.local.v local.__b__
000000E0: conv.v.b
000000E4: bf 0x20C0730
000000E8: push.imm.e 3
000000EC: conv.i.v
000000F0: push.imm.e 3900
000000F4: conv.i.v
000000F8: push.imm.e -1
000000FC: push.imm.e 0
00000100: push.v obj0.view_xview[array]
00000108: push.imm.e -1
0000010C: push.imm.e 0
00000110: push.v obj0.view_wview[array]
00000118: add.v.v
0000011C: call action_if_variable(argc=3)
00000124: pop.v.v local.__b__
0000012C: push.local.v local.__b__
00000134: conv.v.b
00000138: bf 0x20C0730
0000013C: push.imm.e 4
00000140: conv.i.v
00000144: push.imm.e -200
00000148: conv.i.v
0000014C: push.imm.e -1
00000150: push.imm.e 0
00000154: push.v obj0.view_yview[array]
0000015C: call action_if_variable(argc=3)
00000164: pop.v.v local.__b__
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x20C0730
0000017C: push.imm.e 3
00000180: conv.i.v
00000184: push.imm.e 2090
00000188: conv.i.v
0000018C: push.imm.e -1
00000190: push.imm.e 0
00000194: push.v obj0.view_yview[array]
0000019C: push.imm.e -1
000001A0: push.imm.e 0
000001A4: push.v obj0.view_hview[array]
000001AC: add.v.v
000001B0: call action_if_variable(argc=3)
000001B8: pop.v.v local.__b__
000001C0: push.local.v local.__b__
000001C8: conv.v.b
000001CC: bf 0x20C0730
000001D0: push.imm.e 0
000001D4: conv.i.v
000001D8: push.imm.e 4
000001DC: conv.i.v
000001E0: push.builtin.v os_type
000001E8: call action_if_variable(argc=3)
000001F0: pop.v.v local.__b__
000001F8: push.local.v local.__b__
00000200: conv.v.b
00000204: bf 0x20C0730
00000208: push.imm.e 1
0000020C: conv.i.v
00000210: call action_if_mouse(argc=1)
00000218: pop.v.v local.__b__
00000220: push.local.v local.__b__
00000228: conv.v.b
0000022C: bf 0x20C0730
00000230: push.v obj142.x
00000238: push.builtin.v mouse_x
00000240: sub.v.v
00000244: pop.v.v xshift
0000024C: push.imm.e 1
00000250: conv.i.v
00000254: call action_set_relative(argc=1)
0000025C: popz
00000260: push.imm.e -1
00000264: push.imm.e 0
00000268: dup 1
0000026C: push.v obj0.view_xview[array]
00000274: push.v xshift
0000027C: add.v.v
00000280: pop.i.v obj0.view_xview[array]
00000288: push.imm.e 0
0000028C: conv.i.v
00000290: call action_set_relative(argc=1)
00000298: popz
0000029C: push.v obj142.y
000002A4: push.builtin.v mouse_y
000002AC: sub.v.v
000002B0: pop.v.v yshift
000002B8: push.imm.e 1
000002BC: conv.i.v
000002C0: call action_set_relative(argc=1)
000002C8: popz
000002CC: push.imm.e -1
000002D0: push.imm.e 0
000002D4: dup 1
000002D8: push.v obj0.view_yview[array]
000002E0: push.v yshift
000002E8: add.v.v
000002EC: pop.i.v obj0.view_yview[array]
000002F4: push.imm.e 0
000002F8: conv.i.v
000002FC: call action_set_relative(argc=1)
00000304: popz
00000308: push.imm.e 0
0000030C: conv.i.v
00000310: push.imm.e 1
00000314: conv.i.v
00000318: push.v goer
00000320: call action_if_variable(argc=3)
00000328: pop.v.v local.__b__
00000330: push.local.v local.__b__
00000338: conv.v.b
0000033C: bf 0x20C0A24
00000340: push.imm.e 1
00000344: conv.i.v
00000348: push.imm.e -1
0000034C: push.imm.e 0
00000350: push.v obj0.view_yview[array]
00000358: push.imm.e -1
0000035C: push.imm.e 0
00000360: push.v obj0.view_hview[array]
00000368: add.v.v
0000036C: push.imm.e 100
00000370: sub.i.v
00000374: push.builtin.v mouse_y
0000037C: call action_if_variable(argc=3)
00000384: pop.v.v local.__b__
0000038C: push.local.v local.__b__
00000394: conv.v.b
00000398: bf 0x20C0A24
0000039C: push.imm.e 4
000003A0: conv.i.v
000003A4: push.imm.e 0
000003A8: conv.i.v
000003AC: push.imm.e -1
000003B0: push.imm.e 0
000003B4: push.v obj0.view_xview[array]
000003BC: call action_if_variable(argc=3)
000003C4: pop.v.v local.__b__
000003CC: push.local.v local.__b__
000003D4: conv.v.b
000003D8: bf 0x20C0A24
000003DC: push.imm.e 3
000003E0: conv.i.v
000003E4: push.imm.e 3900
000003E8: conv.i.v
000003EC: push.imm.e -1
000003F0: push.imm.e 0
000003F4: push.v obj0.view_xview[array]
000003FC: push.imm.e -1
00000400: push.imm.e 0
00000404: push.v obj0.view_wview[array]
0000040C: add.v.v
00000410: call action_if_variable(argc=3)
00000418: pop.v.v local.__b__
00000420: push.local.v local.__b__
00000428: conv.v.b
0000042C: bf 0x20C0A24
00000430: push.imm.e 4
00000434: conv.i.v
00000438: push.imm.e -200
0000043C: conv.i.v
00000440: push.imm.e -1
00000444: push.imm.e 0
00000448: push.v obj0.view_yview[array]
00000450: call action_if_variable(argc=3)
00000458: pop.v.v local.__b__
00000460: push.local.v local.__b__
00000468: conv.v.b
0000046C: bf 0x20C0A24
00000470: push.imm.e 3
00000474: conv.i.v
00000478: push.imm.e 2090
0000047C: conv.i.v
00000480: push.imm.e -1
00000484: push.imm.e 0
00000488: push.v obj0.view_yview[array]
00000490: push.imm.e -1
00000494: push.imm.e 0
00000498: push.v obj0.view_hview[array]
000004A0: add.v.v
000004A4: call action_if_variable(argc=3)
000004AC: pop.v.v local.__b__
000004B4: push.local.v local.__b__
000004BC: conv.v.b
000004C0: bf 0x20C0A24
000004C4: push.imm.e 0
000004C8: conv.i.v
000004CC: push.imm.e 0
000004D0: conv.i.v
000004D4: push.builtin.v os_type
000004DC: call action_if_variable(argc=3)
000004E4: pop.v.v local.__b__
000004EC: push.local.v local.__b__
000004F4: conv.v.b
000004F8: bf 0x20C0A24
000004FC: push.imm.e 2
00000500: conv.i.v
00000504: call action_if_mouse(argc=1)
0000050C: pop.v.v local.__b__
00000514: push.local.v local.__b__
0000051C: conv.v.b
00000520: bf 0x20C0A24
00000524: push.v obj142.x
0000052C: push.builtin.v mouse_x
00000534: sub.v.v
00000538: pop.v.v xshift
00000540: push.imm.e 1
00000544: conv.i.v
00000548: call action_set_relative(argc=1)
00000550: popz
00000554: push.imm.e -1
00000558: push.imm.e 0
0000055C: dup 1
00000560: push.v obj0.view_xview[array]
00000568: push.v xshift
00000570: add.v.v
00000574: pop.i.v obj0.view_xview[array]
0000057C: push.imm.e 0
00000580: conv.i.v
00000584: call action_set_relative(argc=1)
0000058C: popz
00000590: push.v obj142.y
00000598: push.builtin.v mouse_y
000005A0: sub.v.v
000005A4: pop.v.v yshift
000005AC: push.imm.e 1
000005B0: conv.i.v
000005B4: call action_set_relative(argc=1)
000005BC: popz
000005C0: push.imm.e -1
000005C4: push.imm.e 0
000005C8: dup 1
000005CC: push.v obj0.view_yview[array]
000005D4: push.v yshift
000005DC: add.v.v
000005E0: pop.i.v obj0.view_yview[array]
000005E8: push.imm.e 0
000005EC: conv.i.v
000005F0: call action_set_relative(argc=1)
000005F8: popz
000005FC: push.imm.e 0
00000600: conv.i.v
00000604: push.imm.e 1
00000608: conv.i.v
0000060C: push.imm.e 160
00000610: conv.i.v
00000614: call action_if_number(argc=3)
0000061C: pop.v.v local.__b__
00000624: push.local.v local.__b__
0000062C: conv.v.b
00000630: bf 0x20C0AD8
00000634: push.imm.e 2
00000638: conv.i.v
0000063C: push.imm.e 3900
00000640: conv.i.v
00000644: push.imm.e -1
00000648: push.imm.e 0
0000064C: push.v obj0.view_xview[array]
00000654: push.imm.e -1
00000658: push.imm.e 0
0000065C: push.v obj0.view_wview[array]
00000664: add.v.v
00000668: call action_if_variable(argc=3)
00000670: pop.v.v local.__b__
00000678: push.local.v local.__b__
00000680: conv.v.b
00000684: bf 0x20C0AD8
00000688: push.imm.e 3900
0000068C: push.imm.e -1
00000690: push.imm.e 0
00000694: push.v obj0.view_wview[array]
0000069C: sub.v.i
000006A0: push.imm.e -1
000006A4: push.imm.e 0
000006A8: pop.v.v obj0.view_xview[array]
000006B0: push.imm.e 0
000006B4: conv.i.v
000006B8: push.imm.e 0
000006BC: conv.i.v
000006C0: push.imm.e 162
000006C4: conv.i.v
000006C8: call action_if_number(argc=3)
000006D0: pop.v.v local.__b__
000006D8: push.local.v local.__b__
000006E0: conv.v.b
000006E4: bf 0x20C0BC4
000006E8: push.imm.e 0
000006EC: conv.i.v
000006F0: push.imm.e 0
000006F4: conv.i.v
000006F8: push.imm.e 160
000006FC: conv.i.v
00000700: call action_if_number(argc=3)
00000708: pop.v.v local.__b__
00000710: push.local.v local.__b__
00000718: conv.v.b
0000071C: bf 0x20C0BC4
00000720: push.imm.e 2
00000724: conv.i.v
00000728: push.imm.e 1810
0000072C: conv.i.v
00000730: push.imm.e -1
00000734: push.imm.e 0
00000738: push.v obj0.view_xview[array]
00000740: push.imm.e -1
00000744: push.imm.e 0
00000748: push.v obj0.view_wview[array]
00000750: add.v.v
00000754: call action_if_variable(argc=3)
0000075C: pop.v.v local.__b__
00000764: push.local.v local.__b__
0000076C: conv.v.b
00000770: bf 0x20C0BC4
00000774: push.imm.e 1810
00000778: push.imm.e -1
0000077C: push.imm.e 0
00000780: push.v obj0.view_wview[array]
00000788: sub.v.i
0000078C: push.imm.e -1
00000790: push.imm.e 0
00000794: pop.v.v obj0.view_xview[array]
0000079C: push.imm.e 1
000007A0: conv.i.v
000007A4: push.imm.e 0
000007A8: conv.i.v
000007AC: push.imm.e -1
000007B0: push.imm.e 0
000007B4: push.v obj0.view_xview[array]
000007BC: call action_if_variable(argc=3)
000007C4: pop.v.v local.__b__
000007CC: push.local.v local.__b__
000007D4: conv.v.b
000007D8: bf 0x20C0C18
000007DC: push.imm.e 0
000007E0: push.imm.e -1
000007E4: push.imm.e 0
000007E8: pop.v.i obj0.view_xview[array]
000007F0: push.imm.e 0
000007F4: conv.i.v
000007F8: push.imm.e 1
000007FC: conv.i.v
00000800: push.imm.e 161
00000804: conv.i.v
00000808: call action_if_number(argc=3)
00000810: pop.v.v local.__b__
00000818: push.local.v local.__b__
00000820: conv.v.b
00000824: bf 0x20C0CCC
00000828: push.imm.e 2
0000082C: conv.i.v
00000830: push.imm.e 2090
00000834: conv.i.v
00000838: push.imm.e -1
0000083C: push.imm.e 0
00000840: push.v obj0.view_yview[array]
00000848: push.imm.e -1
0000084C: push.imm.e 0
00000850: push.v obj0.view_hview[array]
00000858: add.v.v
0000085C: call action_if_variable(argc=3)
00000864: pop.v.v local.__b__
0000086C: push.local.v local.__b__
00000874: conv.v.b
00000878: bf 0x20C0CCC
0000087C: push.imm.e 2090
00000880: push.imm.e -1
00000884: push.imm.e 0
00000888: push.v obj0.view_hview[array]
00000890: sub.v.i
00000894: push.imm.e -1
00000898: push.imm.e 0
0000089C: pop.v.v obj0.view_yview[array]
000008A4: push.imm.e 0
000008A8: conv.i.v
000008AC: push.imm.e 0
000008B0: conv.i.v
000008B4: push.imm.e 161
000008B8: conv.i.v
000008BC: call action_if_number(argc=3)
000008C4: pop.v.v local.__b__
000008CC: push.local.v local.__b__
000008D4: conv.v.b
000008D8: bf 0x20C0D80
000008DC: push.imm.e 2
000008E0: conv.i.v
000008E4: push.imm.e 1920
000008E8: conv.i.v
000008EC: push.imm.e -1
000008F0: push.imm.e 0
000008F4: push.v obj0.view_yview[array]
000008FC: push.imm.e -1
00000900: push.imm.e 0
00000904: push.v obj0.view_hview[array]
0000090C: add.v.v
00000910: call action_if_variable(argc=3)
00000918: pop.v.v local.__b__
00000920: push.local.v local.__b__
00000928: conv.v.b
0000092C: bf 0x20C0D80
00000930: push.imm.e 1920
00000934: push.imm.e -1
00000938: push.imm.e 0
0000093C: push.v obj0.view_hview[array]
00000944: sub.v.i
00000948: push.imm.e -1
0000094C: push.imm.e 0
00000950: pop.v.v obj0.view_yview[array]
00000958: push.imm.e 1
0000095C: conv.i.v
00000960: push.imm.e -200
00000964: conv.i.v
00000968: push.imm.e -1
0000096C: push.imm.e 0
00000970: push.v obj0.view_yview[array]
00000978: call action_if_variable(argc=3)
00000980: pop.v.v local.__b__
00000988: push.local.v local.__b__
00000990: conv.v.b
00000994: bf 0x20C0DD4
00000998: push.imm.e -200
0000099C: push.imm.e -1
000009A0: push.imm.e 0
000009A4: pop.v.i obj0.view_yview[array]
000009AC: push.imm.e 0
000009B0: conv.i.v
000009B4: push.imm.e 1
000009B8: conv.i.v
000009BC: push.imm.e 162
000009C0: conv.i.v
000009C4: call action_if_number(argc=3)
000009CC: pop.v.v local.__b__
000009D4: push.local.v local.__b__
000009DC: conv.v.b
000009E0: bf 0x20C0E88
000009E4: push.imm.e 2
000009E8: conv.i.v
000009EC: push.imm.e 3900
000009F0: conv.i.v
000009F4: push.imm.e -1
000009F8: push.imm.e 0
000009FC: push.v obj0.view_xview[array]
00000A04: push.imm.e -1
00000A08: push.imm.e 0
00000A0C: push.v obj0.view_wview[array]
00000A14: add.v.v
00000A18: call action_if_variable(argc=3)
00000A20: pop.v.v local.__b__
00000A28: push.local.v local.__b__
00000A30: conv.v.b
00000A34: bf 0x20C0E88
00000A38: push.imm.e 3900
00000A3C: push.imm.e -1
00000A40: push.imm.e 0
00000A44: push.v obj0.view_wview[array]
00000A4C: sub.v.i
00000A50: push.imm.e -1
00000A54: push.imm.e 0
00000A58: pop.v.v obj0.view_xview[array]
00000A60: push.imm.e 0
00000A64: conv.i.v
00000A68: push.imm.e 1
00000A6C: conv.i.v
00000A70: push.imm.e 736
00000A74: conv.i.v
00000A78: call action_if_number(argc=3)
00000A80: pop.v.v local.__b__
00000A88: push.local.v local.__b__
00000A90: conv.v.b
00000A94: bf 0x20C1060
00000A98: push.imm.e 2
00000A9C: conv.i.v
00000AA0: push.imm.e 1564
00000AA4: conv.i.v
00000AA8: push.imm.e -1
00000AAC: push.imm.e 0
00000AB0: push.v obj0.view_yview[array]
00000AB8: push.imm.e -1
00000ABC: push.imm.e 0
00000AC0: push.v obj0.view_hview[array]
00000AC8: add.v.v
00000ACC: call action_if_variable(argc=3)
00000AD4: pop.v.v local.__b__
00000ADC: push.local.v local.__b__
00000AE4: conv.v.b
00000AE8: bf 0x20C0F3C
00000AEC: push.imm.e 1564
00000AF0: push.imm.e -1
00000AF4: push.imm.e 0
00000AF8: push.v obj0.view_hview[array]
00000B00: sub.v.i
00000B04: push.imm.e -1
00000B08: push.imm.e 0
00000B0C: pop.v.v obj0.view_yview[array]
00000B14: push.imm.e 2
00000B18: conv.i.v
00000B1C: push.imm.e 1920
00000B20: conv.i.v
00000B24: push.imm.e -1
00000B28: push.imm.e 0
00000B2C: push.v obj0.view_xview[array]
00000B34: push.imm.e -1
00000B38: push.imm.e 0
00000B3C: push.v obj0.view_wview[array]
00000B44: add.v.v
00000B48: call action_if_variable(argc=3)
00000B50: pop.v.v local.__b__
00000B58: push.local.v local.__b__
00000B60: conv.v.b
00000B64: bf 0x20C0FB8
00000B68: push.imm.e 1920
00000B6C: push.imm.e -1
00000B70: push.imm.e 0
00000B74: push.v obj0.view_wview[array]
00000B7C: sub.v.i
00000B80: push.imm.e -1
00000B84: push.imm.e 0
00000B88: pop.v.v obj0.view_xview[array]
00000B90: push.imm.e 3
00000B94: conv.i.v
00000B98: push.imm.e 0
00000B9C: conv.i.v
00000BA0: push.imm.e -1
00000BA4: push.imm.e 0
00000BA8: push.v obj0.view_yview[array]
00000BB0: call action_if_variable(argc=3)
00000BB8: pop.v.v local.__b__
00000BC0: push.local.v local.__b__
00000BC8: conv.v.b
00000BCC: bf 0x20C100C
00000BD0: push.imm.e 0
00000BD4: push.imm.e -1
00000BD8: push.imm.e 0
00000BDC: pop.v.i obj0.view_yview[array]
00000BE4: push.imm.e 3
00000BE8: conv.i.v
00000BEC: push.imm.e 0
00000BF0: conv.i.v
00000BF4: push.imm.e -1
00000BF8: push.imm.e 0
00000BFC: push.v obj0.view_xview[array]
00000C04: call action_if_variable(argc=3)
00000C0C: pop.v.v local.__b__
00000C14: push.local.v local.__b__
00000C1C: conv.v.b
00000C20: bf 0x20C1060
00000C24: push.imm.e 0
00000C28: push.imm.e -1
00000C2C: push.imm.e 0
00000C30: pop.v.i obj0.view_xview[array]
00000C38: push.imm.e 0
00000C3C: conv.i.v
00000C40: call action_set_relative(argc=1)
00000C48: popz