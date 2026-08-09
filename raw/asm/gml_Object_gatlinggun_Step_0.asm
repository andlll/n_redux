// gml_Object_gatlinggun_Step_0  locals=2 args=0 len=8128
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 15
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20F05D8
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e 550
00000058: conv.i.v
0000005C: push.imm.e 15
00000060: conv.i.v
00000064: call distance_to_object(argc=1)
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20F05D8
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.v spra
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20F05D8
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.v launching
000000DC: call action_if_variable(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20F05D8
000000FC: push.imm.e 3
00000100: push.imm.e -1
00000104: push.imm.e 11
00000108: pop.v.i obj0.alarm[array]
00000110: push.imm.e 6
00000114: push.imm.e -1
00000118: push.imm.e 6
0000011C: pop.v.i obj0.alarm[array]
00000124: push.imm.e 15
00000128: conv.i.v
0000012C: push.v y
00000134: push.v x
0000013C: call instance_nearest(argc=3)
00000144: conv.v.i
00000148: push.v [stacktop].y
00000150: push.imm.e 15
00000154: conv.i.v
00000158: push.v y
00000160: push.v x
00000168: call instance_nearest(argc=3)
00000170: conv.v.i
00000174: push.v [stacktop].x
0000017C: push.v y
00000184: push.v x
0000018C: call point_direction(argc=4)
00000194: pop.v.v direttorio
0000019C: push.v direttorio
000001A4: push.d 22.5
000001B0: cmp.d.v <=
000001B4: bf 0x20F0254
000001B8: push.imm.e 212
000001BC: pop.v.i sprite_index
000001C4: push.v direttorio
000001CC: push.d 22.5
000001D8: cmp.d.v >
000001DC: bf 0x20F0290
000001E0: push.v direttorio
000001E8: push.imm.e 45
000001EC: cmp.i.v <=
000001F0: bf 0x20F0290
000001F4: push.imm.e 214
000001F8: pop.v.i sprite_index
00000200: push.v direttorio
00000208: push.imm.e 45
0000020C: cmp.i.v >
00000210: bf 0x20F02CC
00000214: push.v direttorio
0000021C: push.d 67.5
00000228: cmp.d.v <=
0000022C: bf 0x20F02CC
00000230: push.imm.e 216
00000234: pop.v.i sprite_index
0000023C: push.v direttorio
00000244: push.d 67.5
00000250: cmp.d.v >
00000254: bf 0x20F0308
00000258: push.v direttorio
00000260: push.imm.e 90
00000264: cmp.i.v <=
00000268: bf 0x20F0308
0000026C: push.imm.e 218
00000270: pop.v.i sprite_index
00000278: push.v direttorio
00000280: push.imm.e 90
00000284: cmp.i.v >
00000288: bf 0x20F0344
0000028C: push.v direttorio
00000294: push.d 112.5
000002A0: cmp.d.v <=
000002A4: bf 0x20F0344
000002A8: push.imm.e 220
000002AC: pop.v.i sprite_index
000002B4: push.v direttorio
000002BC: push.d 112.5
000002C8: cmp.d.v >
000002CC: bf 0x20F0380
000002D0: push.v direttorio
000002D8: push.imm.e 135
000002DC: cmp.i.v <=
000002E0: bf 0x20F0380
000002E4: push.imm.e 222
000002E8: pop.v.i sprite_index
000002F0: push.v direttorio
000002F8: push.imm.e 135
000002FC: cmp.i.v >
00000300: bf 0x20F03BC
00000304: push.v direttorio
0000030C: push.d 157.5
00000318: cmp.d.v <=
0000031C: bf 0x20F03BC
00000320: push.imm.e 224
00000324: pop.v.i sprite_index
0000032C: push.v direttorio
00000334: push.d 157.5
00000340: cmp.d.v >
00000344: bf 0x20F03F8
00000348: push.v direttorio
00000350: push.imm.e 180
00000354: cmp.i.v <=
00000358: bf 0x20F03F8
0000035C: push.imm.e 226
00000360: pop.v.i sprite_index
00000368: push.v direttorio
00000370: push.imm.e 180
00000374: cmp.i.v >
00000378: bf 0x20F0434
0000037C: push.v direttorio
00000384: push.d 202.5
00000390: cmp.d.v <=
00000394: bf 0x20F0434
00000398: push.imm.e 228
0000039C: pop.v.i sprite_index
000003A4: push.v direttorio
000003AC: push.d 202.5
000003B8: cmp.d.v >
000003BC: bf 0x20F0470
000003C0: push.v direttorio
000003C8: push.imm.e 225
000003CC: cmp.i.v <=
000003D0: bf 0x20F0470
000003D4: push.imm.e 230
000003D8: pop.v.i sprite_index
000003E0: push.v direttorio
000003E8: push.imm.e 225
000003EC: cmp.i.v >
000003F0: bf 0x20F04AC
000003F4: push.v direttorio
000003FC: push.d 247.5
00000408: cmp.d.v <=
0000040C: bf 0x20F04AC
00000410: push.imm.e 232
00000414: pop.v.i sprite_index
0000041C: push.v direttorio
00000424: push.d 247.5
00000430: cmp.d.v >
00000434: bf 0x20F04E8
00000438: push.v direttorio
00000440: push.imm.e 270
00000444: cmp.i.v <=
00000448: bf 0x20F04E8
0000044C: push.imm.e 234
00000450: pop.v.i sprite_index
00000458: push.v direttorio
00000460: push.imm.e 270
00000464: cmp.i.v >
00000468: bf 0x20F0524
0000046C: push.v direttorio
00000474: push.d 292.5
00000480: cmp.d.v <=
00000484: bf 0x20F0524
00000488: push.imm.e 236
0000048C: pop.v.i sprite_index
00000494: push.v direttorio
0000049C: push.d 292.5
000004A8: cmp.d.v >
000004AC: bf 0x20F0560
000004B0: push.v direttorio
000004B8: push.imm.e 315
000004BC: cmp.i.v <=
000004C0: bf 0x20F0560
000004C4: push.imm.e 238
000004C8: pop.v.i sprite_index
000004D0: push.v direttorio
000004D8: push.imm.e 315
000004DC: cmp.i.v >
000004E0: bf 0x20F059C
000004E4: push.v direttorio
000004EC: push.d 337.5
000004F8: cmp.d.v <=
000004FC: bf 0x20F059C
00000500: push.imm.e 208
00000504: pop.v.i sprite_index
0000050C: push.v direttorio
00000514: push.d 337.5
00000520: cmp.d.v >
00000524: bf 0x20F05D8
00000528: push.v direttorio
00000530: push.imm.e 360
00000534: cmp.i.v <=
00000538: bf 0x20F05D8
0000053C: push.imm.e 210
00000540: pop.v.i sprite_index
00000548: push.imm.e 3
0000054C: conv.i.v
00000550: push.imm.e 0
00000554: conv.i.v
00000558: push.v life
00000560: call action_if_variable(argc=3)
00000568: pop.v.v local.__b__
00000570: push.local.v local.__b__
00000578: conv.v.b
0000057C: bf 0x20F0664
00000580: push.imm.e 0
00000584: conv.i.v
00000588: push.imm.e 0
0000058C: conv.i.v
00000590: push.imm.e 261
00000594: conv.i.v
00000598: call action_create_object(argc=3)
000005A0: popz
000005A4: push.imm.e 0
000005A8: conv.i.v
000005AC: push.imm.e 0
000005B0: conv.i.v
000005B4: push.imm.e 450
000005B8: conv.i.v
000005BC: call action_create_object(argc=3)
000005C4: popz
000005C8: call action_kill_object(argc=0)
000005D0: popz
000005D4: push.imm.e 0
000005D8: conv.i.v
000005DC: push.imm.e 0
000005E0: conv.i.v
000005E4: push.imm.e 127
000005E8: conv.i.v
000005EC: call action_if_number(argc=3)
000005F4: pop.v.v local.__b__
000005FC: push.local.v local.__b__
00000604: conv.v.b
00000608: bf 0x20F08E8
0000060C: push.imm.e 0
00000610: conv.i.v
00000614: push.imm.e 1
00000618: conv.i.v
0000061C: push.v redder
00000624: call action_if_variable(argc=3)
0000062C: pop.v.v local.__b__
00000634: push.local.v local.__b__
0000063C: conv.v.b
00000640: bf 0x20F08E8
00000644: push.imm.e 455
00000648: pushenv 0x20F0718
0000064C: push.imm.e 0
00000650: conv.i.v
00000654: push.imm.e 1
00000658: conv.i.v
0000065C: push.v night
00000664: call action_if_variable(argc=3)
0000066C: pop.v.v local.__b__
00000674: push.local.v local.__b__
0000067C: conv.v.b
00000680: bf 0x20F0718
00000684: b 0x20F0720
00000688: popenv 0x40F06DC
0000068C: b 0x20F0724
00000690: popenv 0x1CF0720
00000694: push.local.v local.__b__
0000069C: conv.v.b
000006A0: bf 0x20F0754
000006A4: push.imm.e 1
000006A8: conv.i.v
000006AC: push.i 16366009
000006B4: conv.i.v
000006B8: call action_sprite_color(argc=2)
000006C0: popz
000006C4: push.imm.e 455
000006C8: pushenv 0x20F0798
000006CC: push.imm.e 0
000006D0: conv.i.v
000006D4: push.imm.e 1
000006D8: conv.i.v
000006DC: push.v dawn
000006E4: call action_if_variable(argc=3)
000006EC: pop.v.v local.__b__
000006F4: push.local.v local.__b__
000006FC: conv.v.b
00000700: bf 0x20F0798
00000704: b 0x20F07A0
00000708: popenv 0x40F075C
0000070C: b 0x20F07A4
00000710: popenv 0x1CF07A0
00000714: push.local.v local.__b__
0000071C: conv.v.b
00000720: bf 0x20F07D4
00000724: push.imm.e 1
00000728: conv.i.v
0000072C: push.i 15201023
00000734: conv.i.v
00000738: call action_sprite_color(argc=2)
00000740: popz
00000744: push.imm.e 455
00000748: pushenv 0x20F0818
0000074C: push.imm.e 0
00000750: conv.i.v
00000754: push.imm.e 0
00000758: conv.i.v
0000075C: push.v dawn
00000764: call action_if_variable(argc=3)
0000076C: pop.v.v local.__b__
00000774: push.local.v local.__b__
0000077C: conv.v.b
00000780: bf 0x20F0818
00000784: b 0x20F0820
00000788: popenv 0x40F07DC
0000078C: b 0x20F0824
00000790: popenv 0x1CF0820
00000794: push.local.v local.__b__
0000079C: conv.v.b
000007A0: bf 0x20F08B4
000007A4: push.imm.e 455
000007A8: pushenv 0x20F0878
000007AC: push.imm.e 0
000007B0: conv.i.v
000007B4: push.imm.e 0
000007B8: conv.i.v
000007BC: push.v night
000007C4: call action_if_variable(argc=3)
000007CC: pop.v.v local.__b__
000007D4: push.local.v local.__b__
000007DC: conv.v.b
000007E0: bf 0x20F0878
000007E4: b 0x20F0880
000007E8: popenv 0x40F083C
000007EC: b 0x20F0884
000007F0: popenv 0x1CF0880
000007F4: push.local.v local.__b__
000007FC: conv.v.b
00000800: bf 0x20F08B4
00000804: push.imm.e 1
00000808: conv.i.v
0000080C: push.i 16777215
00000814: conv.i.v
00000818: call action_sprite_color(argc=2)
00000820: popz
00000824: push.imm.e 0
00000828: conv.i.v
0000082C: call action_set_relative(argc=1)
00000834: popz
00000838: push.imm.e 0
0000083C: pop.v.i redder
00000844: push.imm.e 1
00000848: conv.i.v
0000084C: call action_set_relative(argc=1)
00000854: popz
00000858: push.imm.e 0
0000085C: conv.i.v
00000860: push.imm.e 1
00000864: conv.i.v
00000868: push.imm.e 127
0000086C: conv.i.v
00000870: call action_if_number(argc=3)
00000878: pop.v.v local.__b__
00000880: push.local.v local.__b__
00000888: conv.v.b
0000088C: bf 0x20F0974
00000890: push.imm.e 0
00000894: conv.i.v
00000898: push.imm.e 1
0000089C: conv.i.v
000008A0: push.v redder
000008A8: call action_if_variable(argc=3)
000008B0: pop.v.v local.__b__
000008B8: push.local.v local.__b__
000008C0: conv.v.b
000008C4: bf 0x20F0974
000008C8: push.imm.e 1
000008CC: conv.i.v
000008D0: push.imm.e 255
000008D4: conv.i.v
000008D8: call action_sprite_color(argc=2)
000008E0: popz
000008E4: push.imm.e 2
000008E8: conv.i.v
000008EC: push.imm.e 0
000008F0: conv.i.v
000008F4: push.imm.e 15
000008F8: conv.i.v
000008FC: call action_if_number(argc=3)
00000904: pop.v.v local.__b__
0000090C: push.local.v local.__b__
00000914: conv.v.b
00000918: bf 0x20F1BA8
0000091C: push.imm.e 1
00000920: conv.i.v
00000924: push.imm.e 450
00000928: conv.i.v
0000092C: push.imm.e 16
00000930: conv.i.v
00000934: call distance_to_object(argc=1)
0000093C: call action_if_variable(argc=3)
00000944: pop.v.v local.__b__
0000094C: push.local.v local.__b__
00000954: conv.v.b
00000958: bf 0x20F1BA8
0000095C: push.imm.e 0
00000960: conv.i.v
00000964: push.imm.e 1
00000968: conv.i.v
0000096C: push.v launching
00000974: call action_if_variable(argc=3)
0000097C: pop.v.v local.__b__
00000984: push.local.v local.__b__
0000098C: conv.v.b
00000990: bf 0x20F1BA8
00000994: push.imm.e 15
00000998: conv.i.v
0000099C: push.v y
000009A4: push.v x
000009AC: call instance_nearest(argc=3)
000009B4: conv.v.i
000009B8: push.v [stacktop].y
000009C0: push.imm.e 15
000009C4: conv.i.v
000009C8: push.v y
000009D0: push.v x
000009D8: call instance_nearest(argc=3)
000009E0: conv.v.i
000009E4: push.v [stacktop].x
000009EC: push.v y
000009F4: push.v x
000009FC: call point_direction(argc=4)
00000A04: pop.v.v direttorio
00000A0C: push.imm.e 1
00000A10: pop.v.i spra
00000A18: push.imm.e 0
00000A1C: pop.v.i launching
00000A24: push.imm.e 1
00000A28: pop.v.i amove
00000A30: push.imm.e 3
00000A34: push.imm.e -1
00000A38: push.imm.e 11
00000A3C: pop.v.i obj0.alarm[array]
00000A44: push.imm.e 6
00000A48: push.imm.e -1
00000A4C: push.imm.e 6
00000A50: pop.v.i obj0.alarm[array]
00000A58: push.imm.e 50
00000A5C: push.imm.e -1
00000A60: push.imm.e 9
00000A64: pop.v.i obj0.alarm[array]
00000A6C: push.v direttorio
00000A74: push.d 22.5
00000A80: cmp.d.v <=
00000A84: bf 0x20F0BF4
00000A88: push.imm.e 212
00000A8C: pop.v.i sprite_index
00000A94: push.imm.e 610
00000A98: conv.i.v
00000A9C: push.v y
00000AA4: push.imm.e 123
00000AA8: sub.i.v
00000AAC: push.v x
00000AB4: push.imm.e 127
00000AB8: add.i.v
00000ABC: call instance_create(argc=3)
00000AC4: popz
00000AC8: push.imm.e 610
00000ACC: conv.i.v
00000AD0: push.v y
00000AD8: push.imm.e 155
00000ADC: sub.i.v
00000AE0: push.v x
00000AE8: push.imm.e 128
00000AEC: add.i.v
00000AF0: call instance_create(argc=3)
00000AF8: popz
00000AFC: push.imm.e 143
00000B00: conv.i.v
00000B04: push.v y
00000B0C: push.imm.e 123
00000B10: sub.i.v
00000B14: push.v x
00000B1C: push.imm.e 127
00000B20: add.i.v
00000B24: call instance_create(argc=3)
00000B2C: popz
00000B30: push.imm.e 143
00000B34: conv.i.v
00000B38: push.v y
00000B40: push.imm.e 155
00000B44: sub.i.v
00000B48: push.v x
00000B50: push.imm.e 128
00000B54: add.i.v
00000B58: call instance_create(argc=3)
00000B60: popz
00000B64: push.v direttorio
00000B6C: push.d 22.5
00000B78: cmp.d.v >
00000B7C: bf 0x20F0D00
00000B80: push.v direttorio
00000B88: push.imm.e 45
00000B8C: cmp.i.v <=
00000B90: bf 0x20F0D00
00000B94: push.imm.e 214
00000B98: pop.v.i sprite_index
00000BA0: push.imm.e 615
00000BA4: conv.i.v
00000BA8: push.v y
00000BB0: push.imm.e 153
00000BB4: sub.i.v
00000BB8: push.v x
00000BC0: push.imm.e 124
00000BC4: add.i.v
00000BC8: call instance_create(argc=3)
00000BD0: popz
00000BD4: push.imm.e 615
00000BD8: conv.i.v
00000BDC: push.v y
00000BE4: push.imm.e 182
00000BE8: sub.i.v
00000BEC: push.v x
00000BF4: push.imm.e 106
00000BF8: add.i.v
00000BFC: call instance_create(argc=3)
00000C04: popz
00000C08: push.imm.e 143
00000C0C: conv.i.v
00000C10: push.v y
00000C18: push.imm.e 153
00000C1C: sub.i.v
00000C20: push.v x
00000C28: push.imm.e 124
00000C2C: add.i.v
00000C30: call instance_create(argc=3)
00000C38: popz
00000C3C: push.imm.e 143
00000C40: conv.i.v
00000C44: push.v y
00000C4C: push.imm.e 182
00000C50: sub.i.v
00000C54: push.v x
00000C5C: push.imm.e 106
00000C60: add.i.v
00000C64: call instance_create(argc=3)
00000C6C: popz
00000C70: push.v direttorio
00000C78: push.imm.e 45
00000C7C: cmp.i.v >
00000C80: bf 0x20F0E0C
00000C84: push.v direttorio
00000C8C: push.d 67.5
00000C98: cmp.d.v <=
00000C9C: bf 0x20F0E0C
00000CA0: push.imm.e 216
00000CA4: pop.v.i sprite_index
00000CAC: push.imm.e 615
00000CB0: conv.i.v
00000CB4: push.v y
00000CBC: push.imm.e 184
00000CC0: sub.i.v
00000CC4: push.v x
00000CCC: push.imm.e 109
00000CD0: add.i.v
00000CD4: call instance_create(argc=3)
00000CDC: popz
00000CE0: push.imm.e 615
00000CE4: conv.i.v
00000CE8: push.v y
00000CF0: push.imm.e 202
00000CF4: sub.i.v
00000CF8: push.v x
00000D00: push.imm.e 69
00000D04: add.i.v
00000D08: call instance_create(argc=3)
00000D10: popz
00000D14: push.imm.e 143
00000D18: conv.i.v
00000D1C: push.v y
00000D24: push.imm.e 184
00000D28: sub.i.v
00000D2C: push.v x
00000D34: push.imm.e 109
00000D38: add.i.v
00000D3C: call instance_create(argc=3)
00000D44: popz
00000D48: push.imm.e 143
00000D4C: conv.i.v
00000D50: push.v y
00000D58: push.imm.e 202
00000D5C: sub.i.v
00000D60: push.v x
00000D68: push.imm.e 69
00000D6C: add.i.v
00000D70: call instance_create(argc=3)
00000D78: popz
00000D7C: push.v direttorio
00000D84: push.d 67.5
00000D90: cmp.d.v >
00000D94: bf 0x20F0F18
00000D98: push.v direttorio
00000DA0: push.imm.e 90
00000DA4: cmp.i.v <=
00000DA8: bf 0x20F0F18
00000DAC: push.imm.e 218
00000DB0: pop.v.i sprite_index
00000DB8: push.imm.e 615
00000DBC: conv.i.v
00000DC0: push.v y
00000DC8: push.imm.e 201
00000DCC: sub.i.v
00000DD0: push.v x
00000DD8: push.imm.e 74
00000DDC: add.i.v
00000DE0: call instance_create(argc=3)
00000DE8: popz
00000DEC: push.imm.e 615
00000DF0: conv.i.v
00000DF4: push.v y
00000DFC: push.imm.e 211
00000E00: sub.i.v
00000E04: push.v x
00000E0C: push.imm.e 26
00000E10: add.i.v
00000E14: call instance_create(argc=3)
00000E1C: popz
00000E20: push.imm.e 143
00000E24: conv.i.v
00000E28: push.v y
00000E30: push.imm.e 201
00000E34: sub.i.v
00000E38: push.v x
00000E40: push.imm.e 74
00000E44: add.i.v
00000E48: call instance_create(argc=3)
00000E50: popz
00000E54: push.imm.e 143
00000E58: conv.i.v
00000E5C: push.v y
00000E64: push.imm.e 211
00000E68: sub.i.v
00000E6C: push.v x
00000E74: push.imm.e 26
00000E78: add.i.v
00000E7C: call instance_create(argc=3)
00000E84: popz
00000E88: push.v direttorio
00000E90: push.imm.e 90
00000E94: cmp.i.v >
00000E98: bf 0x20F1024
00000E9C: push.v direttorio
00000EA4: push.d 112.5
00000EB0: cmp.d.v <=
00000EB4: bf 0x20F1024
00000EB8: push.imm.e 220
00000EBC: pop.v.i sprite_index
00000EC4: push.imm.e 615
00000EC8: conv.i.v
00000ECC: push.v y
00000ED4: push.imm.e 213
00000ED8: sub.i.v
00000EDC: push.v x
00000EE4: push.imm.e 25
00000EE8: add.i.v
00000EEC: call instance_create(argc=3)
00000EF4: popz
00000EF8: push.imm.e 615
00000EFC: conv.i.v
00000F00: push.v y
00000F08: push.imm.e 213
00000F0C: sub.i.v
00000F10: push.v x
00000F18: push.imm.e 27
00000F1C: sub.i.v
00000F20: call instance_create(argc=3)
00000F28: popz
00000F2C: push.imm.e 143
00000F30: conv.i.v
00000F34: push.v y
00000F3C: push.imm.e 213
00000F40: sub.i.v
00000F44: push.v x
00000F4C: push.imm.e 25
00000F50: add.i.v
00000F54: call instance_create(argc=3)
00000F5C: popz
00000F60: push.imm.e 143
00000F64: conv.i.v
00000F68: push.v y
00000F70: push.imm.e 213
00000F74: sub.i.v
00000F78: push.v x
00000F80: push.imm.e 27
00000F84: sub.i.v
00000F88: call instance_create(argc=3)
00000F90: popz
00000F94: push.v direttorio
00000F9C: push.d 112.5
00000FA8: cmp.d.v >
00000FAC: bf 0x20F1130
00000FB0: push.v direttorio
00000FB8: push.imm.e 135
00000FBC: cmp.i.v <=
00000FC0: bf 0x20F1130
00000FC4: push.imm.e 222
00000FC8: pop.v.i sprite_index
00000FD0: push.imm.e 615
00000FD4: conv.i.v
00000FD8: push.v y
00000FE0: push.imm.e 210
00000FE4: sub.i.v
00000FE8: push.v x
00000FF0: push.imm.e 25
00000FF4: sub.i.v
00000FF8: call instance_create(argc=3)
00001000: popz
00001004: push.imm.e 615
00001008: conv.i.v
0000100C: push.v y
00001014: push.imm.e 198
00001018: sub.i.v
0000101C: push.v x
00001024: push.imm.e 75
00001028: sub.i.v
0000102C: call instance_create(argc=3)
00001034: popz
00001038: push.imm.e 143
0000103C: conv.i.v
00001040: push.v y
00001048: push.imm.e 210
0000104C: sub.i.v
00001050: push.v x
00001058: push.imm.e 25
0000105C: sub.i.v
00001060: call instance_create(argc=3)
00001068: popz
0000106C: push.imm.e 143
00001070: conv.i.v
00001074: push.v y
0000107C: push.imm.e 198
00001080: sub.i.v
00001084: push.v x
0000108C: push.imm.e 75
00001090: sub.i.v
00001094: call instance_create(argc=3)
0000109C: popz
000010A0: push.v direttorio
000010A8: push.imm.e 135
000010AC: cmp.i.v >
000010B0: bf 0x20F123C
000010B4: push.v direttorio
000010BC: push.d 157.5
000010C8: cmp.d.v <=
000010CC: bf 0x20F123C
000010D0: push.imm.e 224
000010D4: pop.v.i sprite_index
000010DC: push.imm.e 615
000010E0: conv.i.v
000010E4: push.v y
000010EC: push.imm.e 169
000010F0: sub.i.v
000010F4: push.v x
000010FC: push.imm.e 68
00001100: sub.i.v
00001104: call instance_create(argc=3)
0000110C: popz
00001110: push.imm.e 615
00001114: conv.i.v
00001118: push.v y
00001120: push.imm.e 175
00001124: sub.i.v
00001128: push.v x
00001130: push.imm.e 107
00001134: sub.i.v
00001138: call instance_create(argc=3)
00001140: popz
00001144: push.imm.e 143
00001148: conv.i.v
0000114C: push.v y
00001154: push.imm.e 169
00001158: sub.i.v
0000115C: push.v x
00001164: push.imm.e 68
00001168: sub.i.v
0000116C: call instance_create(argc=3)
00001174: popz
00001178: push.imm.e 143
0000117C: conv.i.v
00001180: push.v y
00001188: push.imm.e 175
0000118C: sub.i.v
00001190: push.v x
00001198: push.imm.e 107
0000119C: sub.i.v
000011A0: call instance_create(argc=3)
000011A8: popz
000011AC: push.v direttorio
000011B4: push.d 157.5
000011C0: cmp.d.v >
000011C4: bf 0x20F1348
000011C8: push.v direttorio
000011D0: push.imm.e 180
000011D4: cmp.i.v <=
000011D8: bf 0x20F1348
000011DC: push.imm.e 226
000011E0: pop.v.i sprite_index
000011E8: push.imm.e 615
000011EC: conv.i.v
000011F0: push.v y
000011F8: push.imm.e 180
000011FC: sub.i.v
00001200: push.v x
00001208: push.imm.e 104
0000120C: sub.i.v
00001210: call instance_create(argc=3)
00001218: popz
0000121C: push.imm.e 615
00001220: conv.i.v
00001224: push.v y
0000122C: push.imm.e 150
00001230: sub.i.v
00001234: push.v x
0000123C: push.imm.e 125
00001240: sub.i.v
00001244: call instance_create(argc=3)
0000124C: popz
00001250: push.imm.e 143
00001254: conv.i.v
00001258: push.v y
00001260: push.imm.e 180
00001264: sub.i.v
00001268: push.v x
00001270: push.imm.e 104
00001274: sub.i.v
00001278: call instance_create(argc=3)
00001280: popz
00001284: push.imm.e 143
00001288: conv.i.v
0000128C: push.v y
00001294: push.imm.e 180
00001298: sub.i.v
0000129C: push.v x
000012A4: push.imm.e 125
000012A8: sub.i.v
000012AC: call instance_create(argc=3)
000012B4: popz
000012B8: push.v direttorio
000012C0: push.imm.e 180
000012C4: cmp.i.v >
000012C8: bf 0x20F1454
000012CC: push.v direttorio
000012D4: push.d 202.5
000012E0: cmp.d.v <=
000012E4: bf 0x20F1454
000012E8: push.imm.e 228
000012EC: pop.v.i sprite_index
000012F4: push.imm.e 610
000012F8: conv.i.v
000012FC: push.v y
00001304: push.imm.e 157
00001308: sub.i.v
0000130C: push.v x
00001314: push.imm.e 125
00001318: sub.i.v
0000131C: call instance_create(argc=3)
00001324: popz
00001328: push.imm.e 610
0000132C: conv.i.v
00001330: push.v y
00001338: push.imm.e 122
0000133C: sub.i.v
00001340: push.v x
00001348: push.imm.e 127
0000134C: sub.i.v
00001350: call instance_create(argc=3)
00001358: popz
0000135C: push.imm.e 143
00001360: conv.i.v
00001364: push.v y
0000136C: push.imm.e 157
00001370: sub.i.v
00001374: push.v x
0000137C: push.imm.e 125
00001380: sub.i.v
00001384: call instance_create(argc=3)
0000138C: popz
00001390: push.imm.e 143
00001394: conv.i.v
00001398: push.v y
000013A0: push.imm.e 122
000013A4: sub.i.v
000013A8: push.v x
000013B0: push.imm.e 127
000013B4: sub.i.v
000013B8: call instance_create(argc=3)
000013C0: popz
000013C4: push.v direttorio
000013CC: push.d 202.5
000013D8: cmp.d.v >
000013DC: bf 0x20F1560
000013E0: push.v direttorio
000013E8: push.imm.e 225
000013EC: cmp.i.v <=
000013F0: bf 0x20F1560
000013F4: push.imm.e 230
000013F8: pop.v.i sprite_index
00001400: push.imm.e 610
00001404: conv.i.v
00001408: push.v y
00001410: push.imm.e 130
00001414: sub.i.v
00001418: push.v x
00001420: push.imm.e 128
00001424: sub.i.v
00001428: call instance_create(argc=3)
00001430: popz
00001434: push.imm.e 610
00001438: conv.i.v
0000143C: push.v y
00001444: push.imm.e 100
00001448: sub.i.v
0000144C: push.v x
00001454: push.imm.e 107
00001458: sub.i.v
0000145C: call instance_create(argc=3)
00001464: popz
00001468: push.imm.e 143
0000146C: conv.i.v
00001470: push.v y
00001478: push.imm.e 130
0000147C: sub.i.v
00001480: push.v x
00001488: push.imm.e 128
0000148C: sub.i.v
00001490: call instance_create(argc=3)
00001498: popz
0000149C: push.imm.e 143
000014A0: conv.i.v
000014A4: push.v y
000014AC: push.imm.e 100
000014B0: sub.i.v
000014B4: push.v x
000014BC: push.imm.e 107
000014C0: sub.i.v
000014C4: call instance_create(argc=3)
000014CC: popz
000014D0: push.v direttorio
000014D8: push.imm.e 225
000014DC: cmp.i.v >
000014E0: bf 0x20F166C
000014E4: push.v direttorio
000014EC: push.d 247.5
000014F8: cmp.d.v <=
000014FC: bf 0x20F166C
00001500: push.imm.e 232
00001504: pop.v.i sprite_index
0000150C: push.imm.e 610
00001510: conv.i.v
00001514: push.v y
0000151C: push.imm.e 105
00001520: sub.i.v
00001524: push.v x
0000152C: push.imm.e 107
00001530: sub.i.v
00001534: call instance_create(argc=3)
0000153C: popz
00001540: push.imm.e 610
00001544: conv.i.v
00001548: push.v y
00001550: push.imm.e 81
00001554: sub.i.v
00001558: push.v x
00001560: push.imm.e 72
00001564: sub.i.v
00001568: call instance_create(argc=3)
00001570: popz
00001574: push.imm.e 143
00001578: conv.i.v
0000157C: push.v y
00001584: push.imm.e 105
00001588: sub.i.v
0000158C: push.v x
00001594: push.imm.e 107
00001598: sub.i.v
0000159C: call instance_create(argc=3)
000015A4: popz
000015A8: push.imm.e 143
000015AC: conv.i.v
000015B0: push.v y
000015B8: push.imm.e 81
000015BC: sub.i.v
000015C0: push.v x
000015C8: push.imm.e 72
000015CC: sub.i.v
000015D0: call instance_create(argc=3)
000015D8: popz
000015DC: push.v direttorio
000015E4: push.d 247.5
000015F0: cmp.d.v >
000015F4: bf 0x20F1778
000015F8: push.v direttorio
00001600: push.imm.e 270
00001604: cmp.i.v <=
00001608: bf 0x20F1778
0000160C: push.imm.e 234
00001610: pop.v.i sprite_index
00001618: push.imm.e 610
0000161C: conv.i.v
00001620: push.v y
00001628: push.imm.e 84
0000162C: sub.i.v
00001630: push.v x
00001638: push.imm.e 74
0000163C: sub.i.v
00001640: call instance_create(argc=3)
00001648: popz
0000164C: push.imm.e 610
00001650: conv.i.v
00001654: push.v y
0000165C: push.imm.e 72
00001660: sub.i.v
00001664: push.v x
0000166C: push.imm.e 27
00001670: sub.i.v
00001674: call instance_create(argc=3)
0000167C: popz
00001680: push.imm.e 143
00001684: conv.i.v
00001688: push.v y
00001690: push.imm.e 84
00001694: sub.i.v
00001698: push.v x
000016A0: push.imm.e 74
000016A4: sub.i.v
000016A8: call instance_create(argc=3)
000016B0: popz
000016B4: push.imm.e 143
000016B8: conv.i.v
000016BC: push.v y
000016C4: push.imm.e 72
000016C8: sub.i.v
000016CC: push.v x
000016D4: push.imm.e 27
000016D8: sub.i.v
000016DC: call instance_create(argc=3)
000016E4: popz
000016E8: push.v direttorio
000016F0: push.imm.e 270
000016F4: cmp.i.v >
000016F8: bf 0x20F1884
000016FC: push.v direttorio
00001704: push.d 292.5
00001710: cmp.d.v <=
00001714: bf 0x20F1884
00001718: push.imm.e 236
0000171C: pop.v.i sprite_index
00001724: push.imm.e 610
00001728: conv.i.v
0000172C: push.v y
00001734: push.imm.e 74
00001738: sub.i.v
0000173C: push.v x
00001744: push.imm.e 31
00001748: sub.i.v
0000174C: call instance_create(argc=3)
00001754: popz
00001758: push.imm.e 610
0000175C: conv.i.v
00001760: push.v y
00001768: push.imm.e 76
0000176C: sub.i.v
00001770: push.v x
00001778: push.imm.e 21
0000177C: add.i.v
00001780: call instance_create(argc=3)
00001788: popz
0000178C: push.imm.e 143
00001790: conv.i.v
00001794: push.v y
0000179C: push.imm.e 74
000017A0: sub.i.v
000017A4: push.v x
000017AC: push.imm.e 31
000017B0: sub.i.v
000017B4: call instance_create(argc=3)
000017BC: popz
000017C0: push.imm.e 143
000017C4: conv.i.v
000017C8: push.v y
000017D0: push.imm.e 76
000017D4: sub.i.v
000017D8: push.v x
000017E0: push.imm.e 21
000017E4: add.i.v
000017E8: call instance_create(argc=3)
000017F0: popz
000017F4: push.v direttorio
000017FC: push.d 292.5
00001808: cmp.d.v >
0000180C: bf 0x20F1990
00001810: push.v direttorio
00001818: push.imm.e 315
0000181C: cmp.i.v <=
00001820: bf 0x20F1990
00001824: push.imm.e 238
00001828: pop.v.i sprite_index
00001830: push.imm.e 610
00001834: conv.i.v
00001838: push.v y
00001840: push.imm.e 78
00001844: sub.i.v
00001848: push.v x
00001850: push.imm.e 19
00001854: add.i.v
00001858: call instance_create(argc=3)
00001860: popz
00001864: push.imm.e 610
00001868: conv.i.v
0000186C: push.v y
00001874: push.imm.e 87
00001878: sub.i.v
0000187C: push.v x
00001884: push.imm.e 68
00001888: add.i.v
0000188C: call instance_create(argc=3)
00001894: popz
00001898: push.imm.e 143
0000189C: conv.i.v
000018A0: push.v y
000018A8: push.imm.e 78
000018AC: sub.i.v
000018B0: push.v x
000018B8: push.imm.e 19
000018BC: add.i.v
000018C0: call instance_create(argc=3)
000018C8: popz
000018CC: push.imm.e 143
000018D0: conv.i.v
000018D4: push.v y
000018DC: push.imm.e 87
000018E0: sub.i.v
000018E4: push.v x
000018EC: push.imm.e 68
000018F0: add.i.v
000018F4: call instance_create(argc=3)
000018FC: popz
00001900: push.v direttorio
00001908: push.imm.e 315
0000190C: cmp.i.v >
00001910: bf 0x20F1A9C
00001914: push.v direttorio
0000191C: push.d 337.5
00001928: cmp.d.v <=
0000192C: bf 0x20F1A9C
00001930: push.imm.e 208
00001934: pop.v.i sprite_index
0000193C: push.imm.e 610
00001940: conv.i.v
00001944: push.v y
0000194C: push.imm.e 76
00001950: sub.i.v
00001954: push.v x
0000195C: push.imm.e 72
00001960: add.i.v
00001964: call instance_create(argc=3)
0000196C: popz
00001970: push.imm.e 610
00001974: conv.i.v
00001978: push.v y
00001980: push.imm.e 95
00001984: sub.i.v
00001988: push.v x
00001990: push.imm.e 108
00001994: add.i.v
00001998: call instance_create(argc=3)
000019A0: popz
000019A4: push.imm.e 143
000019A8: conv.i.v
000019AC: push.v y
000019B4: push.imm.e 76
000019B8: sub.i.v
000019BC: push.v x
000019C4: push.imm.e 72
000019C8: add.i.v
000019CC: call instance_create(argc=3)
000019D4: popz
000019D8: push.imm.e 143
000019DC: conv.i.v
000019E0: push.v y
000019E8: push.imm.e 95
000019EC: sub.i.v
000019F0: push.v x
000019F8: push.imm.e 108
000019FC: add.i.v
00001A00: call instance_create(argc=3)
00001A08: popz
00001A0C: push.v direttorio
00001A14: push.d 337.5
00001A20: cmp.d.v >
00001A24: bf 0x20F1BA8
00001A28: push.v direttorio
00001A30: push.imm.e 360
00001A34: cmp.i.v <=
00001A38: bf 0x20F1BA8
00001A3C: push.imm.e 210
00001A40: pop.v.i sprite_index
00001A48: push.imm.e 610
00001A4C: conv.i.v
00001A50: push.v y
00001A58: push.imm.e 95
00001A5C: sub.i.v
00001A60: push.v x
00001A68: push.imm.e 104
00001A6C: add.i.v
00001A70: call instance_create(argc=3)
00001A78: popz
00001A7C: push.imm.e 610
00001A80: conv.i.v
00001A84: push.v y
00001A8C: push.imm.e 125
00001A90: sub.i.v
00001A94: push.v x
00001A9C: push.imm.e 126
00001AA0: add.i.v
00001AA4: call instance_create(argc=3)
00001AAC: popz
00001AB0: push.imm.e 143
00001AB4: conv.i.v
00001AB8: push.v y
00001AC0: push.imm.e 95
00001AC4: sub.i.v
00001AC8: push.v x
00001AD0: push.imm.e 104
00001AD4: add.i.v
00001AD8: call instance_create(argc=3)
00001AE0: popz
00001AE4: push.imm.e 143
00001AE8: conv.i.v
00001AEC: push.v y
00001AF4: push.imm.e 125
00001AF8: sub.i.v
00001AFC: push.v x
00001B04: push.imm.e 126
00001B08: add.i.v
00001B0C: call instance_create(argc=3)
00001B14: popz
00001B18: push.imm.e 0
00001B1C: conv.i.v
00001B20: push.imm.e 0
00001B24: conv.i.v
00001B28: push.v amove
00001B30: call action_if_variable(argc=3)
00001B38: pop.v.v local.__b__
00001B40: push.local.v local.__b__
00001B48: conv.v.b
00001B4C: bf 0x20F203C
00001B50: push.imm.e 0
00001B54: conv.i.v
00001B58: push.imm.e 1
00001B5C: conv.i.v
00001B60: push.v launching
00001B68: call action_if_variable(argc=3)
00001B70: pop.v.v local.__b__
00001B78: push.local.v local.__b__
00001B80: conv.v.b
00001B84: bf 0x20F203C
00001B88: push.imm.e 0
00001B8C: conv.i.v
00001B90: push.imm.e 1
00001B94: conv.i.v
00001B98: push.v spra
00001BA0: call action_if_variable(argc=3)
00001BA8: pop.v.v local.__b__
00001BB0: push.local.v local.__b__
00001BB8: conv.v.b
00001BBC: bf 0x20F203C
00001BC0: push.imm.e 3
00001BC4: push.imm.e -1
00001BC8: push.imm.e 11
00001BCC: pop.v.i obj0.alarm[array]
00001BD4: push.imm.e 6
00001BD8: push.imm.e -1
00001BDC: push.imm.e 6
00001BE0: pop.v.i obj0.alarm[array]
00001BE8: push.imm.e 1
00001BEC: pop.v.i amove
00001BF4: push.imm.e 0
00001BF8: pop.v.i launching
00001C00: push.v direttorio
00001C08: push.d 22.5
00001C14: cmp.d.v <=
00001C18: bf 0x20F1CB8
00001C1C: push.imm.e 212
00001C20: pop.v.i sprite_index
00001C28: push.v direttorio
00001C30: push.d 22.5
00001C3C: cmp.d.v >
00001C40: bf 0x20F1CF4
00001C44: push.v direttorio
00001C4C: push.imm.e 45
00001C50: cmp.i.v <=
00001C54: bf 0x20F1CF4
00001C58: push.imm.e 214
00001C5C: pop.v.i sprite_index
00001C64: push.v direttorio
00001C6C: push.imm.e 45
00001C70: cmp.i.v >
00001C74: bf 0x20F1D30
00001C78: push.v direttorio
00001C80: push.d 67.5
00001C8C: cmp.d.v <=
00001C90: bf 0x20F1D30
00001C94: push.imm.e 216
00001C98: pop.v.i sprite_index
00001CA0: push.v direttorio
00001CA8: push.d 67.5
00001CB4: cmp.d.v >
00001CB8: bf 0x20F1D6C
00001CBC: push.v direttorio
00001CC4: push.imm.e 90
00001CC8: cmp.i.v <=
00001CCC: bf 0x20F1D6C
00001CD0: push.imm.e 218
00001CD4: pop.v.i sprite_index
00001CDC: push.v direttorio
00001CE4: push.imm.e 90
00001CE8: cmp.i.v >
00001CEC: bf 0x20F1DA8
00001CF0: push.v direttorio
00001CF8: push.d 112.5
00001D04: cmp.d.v <=
00001D08: bf 0x20F1DA8
00001D0C: push.imm.e 220
00001D10: pop.v.i sprite_index
00001D18: push.v direttorio
00001D20: push.d 112.5
00001D2C: cmp.d.v >
00001D30: bf 0x20F1DE4
00001D34: push.v direttorio
00001D3C: push.imm.e 135
00001D40: cmp.i.v <=
00001D44: bf 0x20F1DE4
00001D48: push.imm.e 222
00001D4C: pop.v.i sprite_index
00001D54: push.v direttorio
00001D5C: push.imm.e 135
00001D60: cmp.i.v >
00001D64: bf 0x20F1E20
00001D68: push.v direttorio
00001D70: push.d 157.5
00001D7C: cmp.d.v <=
00001D80: bf 0x20F1E20
00001D84: push.imm.e 224
00001D88: pop.v.i sprite_index
00001D90: push.v direttorio
00001D98: push.d 157.5
00001DA4: cmp.d.v >
00001DA8: bf 0x20F1E5C
00001DAC: push.v direttorio
00001DB4: push.imm.e 180
00001DB8: cmp.i.v <=
00001DBC: bf 0x20F1E5C
00001DC0: push.imm.e 226
00001DC4: pop.v.i sprite_index
00001DCC: push.v direttorio
00001DD4: push.imm.e 180
00001DD8: cmp.i.v >
00001DDC: bf 0x20F1E98
00001DE0: push.v direttorio
00001DE8: push.d 202.5
00001DF4: cmp.d.v <=
00001DF8: bf 0x20F1E98
00001DFC: push.imm.e 228
00001E00: pop.v.i sprite_index
00001E08: push.v direttorio
00001E10: push.d 202.5
00001E1C: cmp.d.v >
00001E20: bf 0x20F1ED4
00001E24: push.v direttorio
00001E2C: push.imm.e 225
00001E30: cmp.i.v <=
00001E34: bf 0x20F1ED4
00001E38: push.imm.e 230
00001E3C: pop.v.i sprite_index
00001E44: push.v direttorio
00001E4C: push.imm.e 225
00001E50: cmp.i.v >
00001E54: bf 0x20F1F10
00001E58: push.v direttorio
00001E60: push.d 247.5
00001E6C: cmp.d.v <=
00001E70: bf 0x20F1F10
00001E74: push.imm.e 232
00001E78: pop.v.i sprite_index
00001E80: push.v direttorio
00001E88: push.d 247.5
00001E94: cmp.d.v >
00001E98: bf 0x20F1F4C
00001E9C: push.v direttorio
00001EA4: push.imm.e 270
00001EA8: cmp.i.v <=
00001EAC: bf 0x20F1F4C
00001EB0: push.imm.e 234
00001EB4: pop.v.i sprite_index
00001EBC: push.v direttorio
00001EC4: push.imm.e 270
00001EC8: cmp.i.v >
00001ECC: bf 0x20F1F88
00001ED0: push.v direttorio
00001ED8: push.d 292.5
00001EE4: cmp.d.v <=
00001EE8: bf 0x20F1F88
00001EEC: push.imm.e 236
00001EF0: pop.v.i sprite_index
00001EF8: push.v direttorio
00001F00: push.d 292.5
00001F0C: cmp.d.v >
00001F10: bf 0x20F1FC4
00001F14: push.v direttorio
00001F1C: push.imm.e 315
00001F20: cmp.i.v <=
00001F24: bf 0x20F1FC4
00001F28: push.imm.e 238
00001F2C: pop.v.i sprite_index
00001F34: push.v direttorio
00001F3C: push.imm.e 315
00001F40: cmp.i.v >
00001F44: bf 0x20F2000
00001F48: push.v direttorio
00001F50: push.d 337.5
00001F5C: cmp.d.v <=
00001F60: bf 0x20F2000
00001F64: push.imm.e 208
00001F68: pop.v.i sprite_index
00001F70: push.v direttorio
00001F78: push.d 337.5
00001F84: cmp.d.v >
00001F88: bf 0x20F203C
00001F8C: push.v direttorio
00001F94: push.imm.e 360
00001F98: cmp.i.v <=
00001F9C: bf 0x20F203C
00001FA0: push.imm.e 210
00001FA4: pop.v.i sprite_index
00001FAC: push.imm.e 0
00001FB0: conv.i.v
00001FB4: call action_set_relative(argc=1)
00001FBC: popz