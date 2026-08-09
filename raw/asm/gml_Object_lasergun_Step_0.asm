// gml_Object_lasergun_Step_0  locals=2 args=0 len=4524
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
00000048: bf 0x20F3D58
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e 800
00000058: conv.i.v
0000005C: push.imm.e 15
00000060: conv.i.v
00000064: call distance_to_object(argc=1)
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20F3D58
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.v islas
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20F3D58
000000C4: push.imm.e 15
000000C8: conv.i.v
000000CC: push.v y
000000D4: push.v x
000000DC: call instance_nearest(argc=3)
000000E4: conv.v.i
000000E8: push.v [stacktop].y
000000F0: push.imm.e 15
000000F4: conv.i.v
000000F8: push.v y
00000100: push.v x
00000108: call instance_nearest(argc=3)
00000110: conv.v.i
00000114: push.v [stacktop].x
0000011C: push.v y
00000124: push.v x
0000012C: call point_direction(argc=4)
00000134: pop.v.v direttorio
0000013C: push.v direttorio
00000144: push.d 22.5
00000150: cmp.d.v <=
00000154: bf 0x20F39D4
00000158: push.imm.e 194
0000015C: pop.v.i sprite_index
00000164: push.v direttorio
0000016C: push.d 22.5
00000178: cmp.d.v >
0000017C: bf 0x20F3A10
00000180: push.v direttorio
00000188: push.imm.e 45
0000018C: cmp.i.v <=
00000190: bf 0x20F3A10
00000194: push.imm.e 195
00000198: pop.v.i sprite_index
000001A0: push.v direttorio
000001A8: push.imm.e 45
000001AC: cmp.i.v >
000001B0: bf 0x20F3A4C
000001B4: push.v direttorio
000001BC: push.d 67.5
000001C8: cmp.d.v <=
000001CC: bf 0x20F3A4C
000001D0: push.imm.e 196
000001D4: pop.v.i sprite_index
000001DC: push.v direttorio
000001E4: push.d 67.5
000001F0: cmp.d.v >
000001F4: bf 0x20F3A88
000001F8: push.v direttorio
00000200: push.imm.e 90
00000204: cmp.i.v <=
00000208: bf 0x20F3A88
0000020C: push.imm.e 197
00000210: pop.v.i sprite_index
00000218: push.v direttorio
00000220: push.imm.e 90
00000224: cmp.i.v >
00000228: bf 0x20F3AC4
0000022C: push.v direttorio
00000234: push.d 112.5
00000240: cmp.d.v <=
00000244: bf 0x20F3AC4
00000248: push.imm.e 198
0000024C: pop.v.i sprite_index
00000254: push.v direttorio
0000025C: push.d 112.5
00000268: cmp.d.v >
0000026C: bf 0x20F3B00
00000270: push.v direttorio
00000278: push.imm.e 135
0000027C: cmp.i.v <=
00000280: bf 0x20F3B00
00000284: push.imm.e 199
00000288: pop.v.i sprite_index
00000290: push.v direttorio
00000298: push.imm.e 135
0000029C: cmp.i.v >
000002A0: bf 0x20F3B3C
000002A4: push.v direttorio
000002AC: push.d 157.5
000002B8: cmp.d.v <=
000002BC: bf 0x20F3B3C
000002C0: push.imm.e 200
000002C4: pop.v.i sprite_index
000002CC: push.v direttorio
000002D4: push.d 157.5
000002E0: cmp.d.v >
000002E4: bf 0x20F3B78
000002E8: push.v direttorio
000002F0: push.imm.e 180
000002F4: cmp.i.v <=
000002F8: bf 0x20F3B78
000002FC: push.imm.e 201
00000300: pop.v.i sprite_index
00000308: push.v direttorio
00000310: push.imm.e 180
00000314: cmp.i.v >
00000318: bf 0x20F3BB4
0000031C: push.v direttorio
00000324: push.d 202.5
00000330: cmp.d.v <=
00000334: bf 0x20F3BB4
00000338: push.imm.e 202
0000033C: pop.v.i sprite_index
00000344: push.v direttorio
0000034C: push.d 202.5
00000358: cmp.d.v >
0000035C: bf 0x20F3BF0
00000360: push.v direttorio
00000368: push.imm.e 225
0000036C: cmp.i.v <=
00000370: bf 0x20F3BF0
00000374: push.imm.e 203
00000378: pop.v.i sprite_index
00000380: push.v direttorio
00000388: push.imm.e 225
0000038C: cmp.i.v >
00000390: bf 0x20F3C2C
00000394: push.v direttorio
0000039C: push.d 247.5
000003A8: cmp.d.v <=
000003AC: bf 0x20F3C2C
000003B0: push.imm.e 204
000003B4: pop.v.i sprite_index
000003BC: push.v direttorio
000003C4: push.d 247.5
000003D0: cmp.d.v >
000003D4: bf 0x20F3C68
000003D8: push.v direttorio
000003E0: push.imm.e 270
000003E4: cmp.i.v <=
000003E8: bf 0x20F3C68
000003EC: push.imm.e 205
000003F0: pop.v.i sprite_index
000003F8: push.v direttorio
00000400: push.imm.e 270
00000404: cmp.i.v >
00000408: bf 0x20F3CA4
0000040C: push.v direttorio
00000414: push.d 292.5
00000420: cmp.d.v <=
00000424: bf 0x20F3CA4
00000428: push.imm.e 206
0000042C: pop.v.i sprite_index
00000434: push.v direttorio
0000043C: push.d 292.5
00000448: cmp.d.v >
0000044C: bf 0x20F3CE0
00000450: push.v direttorio
00000458: push.imm.e 315
0000045C: cmp.i.v <=
00000460: bf 0x20F3CE0
00000464: push.imm.e 207
00000468: pop.v.i sprite_index
00000470: push.v direttorio
00000478: push.imm.e 315
0000047C: cmp.i.v >
00000480: bf 0x20F3D1C
00000484: push.v direttorio
0000048C: push.d 337.5
00000498: cmp.d.v <=
0000049C: bf 0x20F3D1C
000004A0: push.imm.e 192
000004A4: pop.v.i sprite_index
000004AC: push.v direttorio
000004B4: push.d 337.5
000004C0: cmp.d.v >
000004C4: bf 0x20F3D58
000004C8: push.v direttorio
000004D0: push.imm.e 360
000004D4: cmp.i.v <=
000004D8: bf 0x20F3D58
000004DC: push.imm.e 193
000004E0: pop.v.i sprite_index
000004E8: push.imm.e 3
000004EC: conv.i.v
000004F0: push.imm.e 0
000004F4: conv.i.v
000004F8: push.v life
00000500: call action_if_variable(argc=3)
00000508: pop.v.v local.__b__
00000510: push.local.v local.__b__
00000518: conv.v.b
0000051C: bf 0x20F3DE4
00000520: push.imm.e 0
00000524: conv.i.v
00000528: push.imm.e 0
0000052C: conv.i.v
00000530: push.imm.e 451
00000534: conv.i.v
00000538: call action_create_object(argc=3)
00000540: popz
00000544: push.imm.e 0
00000548: conv.i.v
0000054C: push.imm.e 0
00000550: conv.i.v
00000554: push.imm.e 262
00000558: conv.i.v
0000055C: call action_create_object(argc=3)
00000564: popz
00000568: call action_kill_object(argc=0)
00000570: popz
00000574: push.imm.e 0
00000578: conv.i.v
0000057C: push.imm.e 0
00000580: conv.i.v
00000584: push.imm.e 127
00000588: conv.i.v
0000058C: call action_if_number(argc=3)
00000594: pop.v.v local.__b__
0000059C: push.local.v local.__b__
000005A4: conv.v.b
000005A8: bf 0x20F4068
000005AC: push.imm.e 0
000005B0: conv.i.v
000005B4: push.imm.e 1
000005B8: conv.i.v
000005BC: push.v redder
000005C4: call action_if_variable(argc=3)
000005CC: pop.v.v local.__b__
000005D4: push.local.v local.__b__
000005DC: conv.v.b
000005E0: bf 0x20F4068
000005E4: push.imm.e 455
000005E8: pushenv 0x20F3E98
000005EC: push.imm.e 0
000005F0: conv.i.v
000005F4: push.imm.e 1
000005F8: conv.i.v
000005FC: push.v night
00000604: call action_if_variable(argc=3)
0000060C: pop.v.v local.__b__
00000614: push.local.v local.__b__
0000061C: conv.v.b
00000620: bf 0x20F3E98
00000624: b 0x20F3EA0
00000628: popenv 0x40F3E5C
0000062C: b 0x20F3EA4
00000630: popenv 0x1CF3EA0
00000634: push.local.v local.__b__
0000063C: conv.v.b
00000640: bf 0x20F3ED4
00000644: push.imm.e 1
00000648: conv.i.v
0000064C: push.i 16366009
00000654: conv.i.v
00000658: call action_sprite_color(argc=2)
00000660: popz
00000664: push.imm.e 455
00000668: pushenv 0x20F3F18
0000066C: push.imm.e 0
00000670: conv.i.v
00000674: push.imm.e 1
00000678: conv.i.v
0000067C: push.v dawn
00000684: call action_if_variable(argc=3)
0000068C: pop.v.v local.__b__
00000694: push.local.v local.__b__
0000069C: conv.v.b
000006A0: bf 0x20F3F18
000006A4: b 0x20F3F20
000006A8: popenv 0x40F3EDC
000006AC: b 0x20F3F24
000006B0: popenv 0x1CF3F20
000006B4: push.local.v local.__b__
000006BC: conv.v.b
000006C0: bf 0x20F3F54
000006C4: push.imm.e 1
000006C8: conv.i.v
000006CC: push.i 15201023
000006D4: conv.i.v
000006D8: call action_sprite_color(argc=2)
000006E0: popz
000006E4: push.imm.e 455
000006E8: pushenv 0x20F3F98
000006EC: push.imm.e 0
000006F0: conv.i.v
000006F4: push.imm.e 0
000006F8: conv.i.v
000006FC: push.v dawn
00000704: call action_if_variable(argc=3)
0000070C: pop.v.v local.__b__
00000714: push.local.v local.__b__
0000071C: conv.v.b
00000720: bf 0x20F3F98
00000724: b 0x20F3FA0
00000728: popenv 0x40F3F5C
0000072C: b 0x20F3FA4
00000730: popenv 0x1CF3FA0
00000734: push.local.v local.__b__
0000073C: conv.v.b
00000740: bf 0x20F4034
00000744: push.imm.e 455
00000748: pushenv 0x20F3FF8
0000074C: push.imm.e 0
00000750: conv.i.v
00000754: push.imm.e 0
00000758: conv.i.v
0000075C: push.v night
00000764: call action_if_variable(argc=3)
0000076C: pop.v.v local.__b__
00000774: push.local.v local.__b__
0000077C: conv.v.b
00000780: bf 0x20F3FF8
00000784: b 0x20F4000
00000788: popenv 0x40F3FBC
0000078C: b 0x20F4004
00000790: popenv 0x1CF4000
00000794: push.local.v local.__b__
0000079C: conv.v.b
000007A0: bf 0x20F4034
000007A4: push.imm.e 1
000007A8: conv.i.v
000007AC: push.i 16777215
000007B4: conv.i.v
000007B8: call action_sprite_color(argc=2)
000007C0: popz
000007C4: push.imm.e 0
000007C8: conv.i.v
000007CC: call action_set_relative(argc=1)
000007D4: popz
000007D8: push.imm.e 0
000007DC: pop.v.i redder
000007E4: push.imm.e 1
000007E8: conv.i.v
000007EC: call action_set_relative(argc=1)
000007F4: popz
000007F8: push.imm.e 0
000007FC: conv.i.v
00000800: push.imm.e 1
00000804: conv.i.v
00000808: push.imm.e 127
0000080C: conv.i.v
00000810: call action_if_number(argc=3)
00000818: pop.v.v local.__b__
00000820: push.local.v local.__b__
00000828: conv.v.b
0000082C: bf 0x20F40F4
00000830: push.imm.e 0
00000834: conv.i.v
00000838: push.imm.e 1
0000083C: conv.i.v
00000840: push.v redder
00000848: call action_if_variable(argc=3)
00000850: pop.v.v local.__b__
00000858: push.local.v local.__b__
00000860: conv.v.b
00000864: bf 0x20F40F4
00000868: push.imm.e 1
0000086C: conv.i.v
00000870: push.imm.e 255
00000874: conv.i.v
00000878: call action_sprite_color(argc=2)
00000880: popz
00000884: push.imm.e 0
00000888: conv.i.v
0000088C: push.imm.e 0
00000890: conv.i.v
00000894: push.v ovr
0000089C: call action_if_variable(argc=3)
000008A4: pop.v.v local.__b__
000008AC: push.local.v local.__b__
000008B4: conv.v.b
000008B8: bf 0x20F4A08
000008BC: push.imm.e 1
000008C0: conv.i.v
000008C4: push.imm.e 200
000008C8: conv.i.v
000008CC: push.imm.e 16
000008D0: conv.i.v
000008D4: call distance_to_object(argc=1)
000008DC: call action_if_variable(argc=3)
000008E4: pop.v.v local.__b__
000008EC: push.local.v local.__b__
000008F4: conv.v.b
000008F8: bf 0x20F4A08
000008FC: push.imm.e 0
00000900: conv.i.v
00000904: push.imm.e 0
00000908: conv.i.v
0000090C: push.v launching
00000914: call action_if_variable(argc=3)
0000091C: pop.v.v local.__b__
00000924: push.local.v local.__b__
0000092C: conv.v.b
00000930: bf 0x20F4A08
00000934: push.imm.e 156
00000938: pushenv 0x20F41E8
0000093C: push.imm.e 2
00000940: conv.i.v
00000944: push.imm.e 200
00000948: conv.i.v
0000094C: push.v ele
00000954: call action_if_variable(argc=3)
0000095C: pop.v.v local.__b__
00000964: push.local.v local.__b__
0000096C: conv.v.b
00000970: bf 0x20F41E8
00000974: b 0x20F41F0
00000978: popenv 0x40F41AC
0000097C: b 0x20F41F4
00000980: popenv 0x1CF41F0
00000984: push.local.v local.__b__
0000098C: conv.v.b
00000990: bf 0x20F4A08
00000994: push.imm.e 156
00000998: pushenv 0x20F4224
0000099C: push.v ele
000009A4: push.imm.e -200
000009A8: add.i.v
000009AC: pop.v.v ele
000009B4: popenv 0x40F420C
000009B8: push.imm.e 0
000009BC: conv.i.v
000009C0: call action_set_relative(argc=1)
000009C8: popz
000009CC: push.imm.e 1
000009D0: pop.v.i islas
000009D8: push.imm.e 1
000009DC: conv.i.v
000009E0: call action_set_relative(argc=1)
000009E8: popz
000009EC: push.imm.e 0
000009F0: conv.i.v
000009F4: call action_set_relative(argc=1)
000009FC: popz
00000A00: push.imm.e 1
00000A04: pop.v.i launching
00000A0C: push.imm.e 1
00000A10: conv.i.v
00000A14: call action_set_relative(argc=1)
00000A1C: popz
00000A20: push.imm.e 0
00000A24: conv.i.v
00000A28: call action_set_relative(argc=1)
00000A30: popz
00000A34: push.imm.e 2
00000A38: conv.i.v
00000A3C: push.imm.e 40
00000A40: conv.i.v
00000A44: call action_set_alarm(argc=2)
00000A4C: popz
00000A50: push.imm.e 1
00000A54: conv.i.v
00000A58: call action_set_relative(argc=1)
00000A60: popz
00000A64: push.imm.e 0
00000A68: conv.i.v
00000A6C: call action_set_relative(argc=1)
00000A74: popz
00000A78: push.imm.e 2
00000A7C: pop.v.i launching
00000A84: push.imm.e 1
00000A88: conv.i.v
00000A8C: call action_set_relative(argc=1)
00000A94: popz
00000A98: push.imm.e 0
00000A9C: conv.i.v
00000AA0: call action_set_relative(argc=1)
00000AA8: popz
00000AAC: push.imm.e 1
00000AB0: conv.i.v
00000AB4: push.imm.e 85
00000AB8: conv.i.v
00000ABC: call action_set_alarm(argc=2)
00000AC4: popz
00000AC8: push.imm.e 1
00000ACC: conv.i.v
00000AD0: call action_set_relative(argc=1)
00000AD8: popz
00000ADC: push.imm.e 15
00000AE0: conv.i.v
00000AE4: push.v y
00000AEC: push.v x
00000AF4: call instance_nearest(argc=3)
00000AFC: conv.v.i
00000B00: push.v [stacktop].y
00000B08: push.imm.e 15
00000B0C: conv.i.v
00000B10: push.v y
00000B18: push.v x
00000B20: call instance_nearest(argc=3)
00000B28: conv.v.i
00000B2C: push.v [stacktop].x
00000B34: push.v y
00000B3C: push.v x
00000B44: call point_direction(argc=4)
00000B4C: pop.v.v direttorio
00000B54: push.v direttorio
00000B5C: push.d 22.5
00000B68: cmp.d.v <=
00000B6C: bf 0x20F4414
00000B70: push.imm.e 287
00000B74: conv.i.v
00000B78: push.v y
00000B80: push.imm.e 321
00000B84: sub.i.v
00000B88: push.v x
00000B90: push.imm.e 81
00000B94: add.i.v
00000B98: call instance_create(argc=3)
00000BA0: popz
00000BA4: push.v direttorio
00000BAC: push.d 22.5
00000BB8: cmp.d.v >
00000BBC: bf 0x20F4478
00000BC0: push.v direttorio
00000BC8: push.imm.e 45
00000BCC: cmp.i.v <=
00000BD0: bf 0x20F4478
00000BD4: push.imm.e 288
00000BD8: conv.i.v
00000BDC: push.v y
00000BE4: push.imm.e 335
00000BE8: sub.i.v
00000BEC: push.v x
00000BF4: push.imm.e 65
00000BF8: add.i.v
00000BFC: call instance_create(argc=3)
00000C04: popz
00000C08: push.v direttorio
00000C10: push.imm.e 45
00000C14: cmp.i.v >
00000C18: bf 0x20F44DC
00000C1C: push.v direttorio
00000C24: push.d 67.5
00000C30: cmp.d.v <=
00000C34: bf 0x20F44DC
00000C38: push.imm.e 288
00000C3C: conv.i.v
00000C40: push.v y
00000C48: push.imm.e 344
00000C4C: sub.i.v
00000C50: push.v x
00000C58: push.imm.e 38
00000C5C: add.i.v
00000C60: call instance_create(argc=3)
00000C68: popz
00000C6C: push.v direttorio
00000C74: push.d 67.5
00000C80: cmp.d.v >
00000C84: bf 0x20F4540
00000C88: push.v direttorio
00000C90: push.imm.e 90
00000C94: cmp.i.v <=
00000C98: bf 0x20F4540
00000C9C: push.imm.e 288
00000CA0: conv.i.v
00000CA4: push.v y
00000CAC: push.imm.e 354
00000CB0: sub.i.v
00000CB4: push.v x
00000CBC: push.imm.e 9
00000CC0: add.i.v
00000CC4: call instance_create(argc=3)
00000CCC: popz
00000CD0: push.v direttorio
00000CD8: push.imm.e 90
00000CDC: cmp.i.v >
00000CE0: bf 0x20F45A4
00000CE4: push.v direttorio
00000CEC: push.d 112.5
00000CF8: cmp.d.v <=
00000CFC: bf 0x20F45A4
00000D00: push.imm.e 288
00000D04: conv.i.v
00000D08: push.v y
00000D10: push.imm.e 355
00000D14: sub.i.v
00000D18: push.v x
00000D20: push.imm.e 23
00000D24: sub.i.v
00000D28: call instance_create(argc=3)
00000D30: popz
00000D34: push.v direttorio
00000D3C: push.d 112.5
00000D48: cmp.d.v >
00000D4C: bf 0x20F4608
00000D50: push.v direttorio
00000D58: push.imm.e 135
00000D5C: cmp.i.v <=
00000D60: bf 0x20F4608
00000D64: push.imm.e 288
00000D68: conv.i.v
00000D6C: push.v y
00000D74: push.imm.e 343
00000D78: sub.i.v
00000D7C: push.v x
00000D84: push.imm.e 49
00000D88: sub.i.v
00000D8C: call instance_create(argc=3)
00000D94: popz
00000D98: push.v direttorio
00000DA0: push.imm.e 135
00000DA4: cmp.i.v >
00000DA8: bf 0x20F466C
00000DAC: push.v direttorio
00000DB4: push.d 157.5
00000DC0: cmp.d.v <=
00000DC4: bf 0x20F466C
00000DC8: push.imm.e 288
00000DCC: conv.i.v
00000DD0: push.v y
00000DD8: push.imm.e 331
00000DDC: sub.i.v
00000DE0: push.v x
00000DE8: push.imm.e 70
00000DEC: sub.i.v
00000DF0: call instance_create(argc=3)
00000DF8: popz
00000DFC: push.v direttorio
00000E04: push.d 157.5
00000E10: cmp.d.v >
00000E14: bf 0x20F46D0
00000E18: push.v direttorio
00000E20: push.imm.e 180
00000E24: cmp.i.v <=
00000E28: bf 0x20F46D0
00000E2C: push.imm.e 288
00000E30: conv.i.v
00000E34: push.v y
00000E3C: push.imm.e 315
00000E40: sub.i.v
00000E44: push.v x
00000E4C: push.imm.e 80
00000E50: sub.i.v
00000E54: call instance_create(argc=3)
00000E5C: popz
00000E60: push.v direttorio
00000E68: push.imm.e 180
00000E6C: cmp.i.v >
00000E70: bf 0x20F4734
00000E74: push.v direttorio
00000E7C: push.d 202.5
00000E88: cmp.d.v <=
00000E8C: bf 0x20F4734
00000E90: push.imm.e 287
00000E94: conv.i.v
00000E98: push.v y
00000EA0: push.imm.e 298
00000EA4: sub.i.v
00000EA8: push.v x
00000EB0: push.imm.e 77
00000EB4: sub.i.v
00000EB8: call instance_create(argc=3)
00000EC0: popz
00000EC4: push.v direttorio
00000ECC: push.d 202.5
00000ED8: cmp.d.v >
00000EDC: bf 0x20F4798
00000EE0: push.v direttorio
00000EE8: push.imm.e 225
00000EEC: cmp.i.v <=
00000EF0: bf 0x20F4798
00000EF4: push.imm.e 287
00000EF8: conv.i.v
00000EFC: push.v y
00000F04: push.imm.e 283
00000F08: sub.i.v
00000F0C: push.v x
00000F14: push.imm.e 65
00000F18: sub.i.v
00000F1C: call instance_create(argc=3)
00000F24: popz
00000F28: push.v direttorio
00000F30: push.imm.e 225
00000F34: cmp.i.v >
00000F38: bf 0x20F47FC
00000F3C: push.v direttorio
00000F44: push.d 247.5
00000F50: cmp.d.v <=
00000F54: bf 0x20F47FC
00000F58: push.imm.e 287
00000F5C: conv.i.v
00000F60: push.v y
00000F68: push.imm.e 268
00000F6C: sub.i.v
00000F70: push.v x
00000F78: push.imm.e 42
00000F7C: sub.i.v
00000F80: call instance_create(argc=3)
00000F88: popz
00000F8C: push.v direttorio
00000F94: push.d 247.5
00000FA0: cmp.d.v >
00000FA4: bf 0x20F4860
00000FA8: push.v direttorio
00000FB0: push.imm.e 270
00000FB4: cmp.i.v <=
00000FB8: bf 0x20F4860
00000FBC: push.imm.e 287
00000FC0: conv.i.v
00000FC4: push.v y
00000FCC: push.imm.e 266
00000FD0: sub.i.v
00000FD4: push.v x
00000FDC: push.imm.e 6
00000FE0: sub.i.v
00000FE4: call instance_create(argc=3)
00000FEC: popz
00000FF0: push.v direttorio
00000FF8: push.imm.e 270
00000FFC: cmp.i.v >
00001000: bf 0x20F48C4
00001004: push.v direttorio
0000100C: push.d 292.5
00001018: cmp.d.v <=
0000101C: bf 0x20F48C4
00001020: push.imm.e 287
00001024: conv.i.v
00001028: push.v y
00001030: push.imm.e 267
00001034: sub.i.v
00001038: push.v x
00001040: push.imm.e 22
00001044: add.i.v
00001048: call instance_create(argc=3)
00001050: popz
00001054: push.v direttorio
0000105C: push.d 292.5
00001068: cmp.d.v >
0000106C: bf 0x20F4928
00001070: push.v direttorio
00001078: push.imm.e 315
0000107C: cmp.i.v <=
00001080: bf 0x20F4928
00001084: push.imm.e 287
00001088: conv.i.v
0000108C: push.v y
00001094: push.imm.e 273
00001098: sub.i.v
0000109C: push.v x
000010A4: push.imm.e 52
000010A8: add.i.v
000010AC: call instance_create(argc=3)
000010B4: popz
000010B8: push.v direttorio
000010C0: push.imm.e 315
000010C4: cmp.i.v >
000010C8: bf 0x20F498C
000010CC: push.v direttorio
000010D4: push.d 337.5
000010E0: cmp.d.v <=
000010E4: bf 0x20F498C
000010E8: push.imm.e 287
000010EC: conv.i.v
000010F0: push.v y
000010F8: push.imm.e 288
000010FC: sub.i.v
00001100: push.v x
00001108: push.imm.e 73
0000110C: add.i.v
00001110: call instance_create(argc=3)
00001118: popz
0000111C: push.v direttorio
00001124: push.d 337.5
00001130: cmp.d.v >
00001134: bf 0x20F49F0
00001138: push.v direttorio
00001140: push.imm.e 360
00001144: cmp.i.v <=
00001148: bf 0x20F49F0
0000114C: push.imm.e 287
00001150: conv.i.v
00001154: push.v y
0000115C: push.imm.e 302
00001160: sub.i.v
00001164: push.v x
0000116C: push.imm.e 82
00001170: add.i.v
00001174: call instance_create(argc=3)
0000117C: popz
00001180: push.imm.e 605
00001184: pushenv 0x20F4A04
00001188: call action_kill_object(argc=0)
00001190: popz
00001194: popenv 0x40F49F8
00001198: push.imm.e 0
0000119C: conv.i.v
000011A0: call action_set_relative(argc=1)
000011A8: popz