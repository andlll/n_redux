// gml_Object_rocket_launcher_Step_0  locals=3 args=0 len=4852
// locals: arguments, __b__, direttorio
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
00000048: bf 0x20EE200
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e 400
00000058: conv.i.v
0000005C: push.imm.e 15
00000060: conv.i.v
00000064: call distance_to_object(argc=1)
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20EE200
0000008C: push.imm.e 15
00000090: conv.i.v
00000094: push.v y
0000009C: push.v x
000000A4: call instance_nearest(argc=3)
000000AC: conv.v.i
000000B0: push.v [stacktop].y
000000B8: push.imm.e 15
000000BC: conv.i.v
000000C0: push.v y
000000C8: push.v x
000000D0: call instance_nearest(argc=3)
000000D8: conv.v.i
000000DC: push.v [stacktop].x
000000E4: push.v y
000000EC: push.v x
000000F4: call point_direction(argc=4)
000000FC: pop.v.v local.direttorio
00000104: push.local.v local.direttorio
0000010C: push.d 22.5
00000118: cmp.d.v <=
0000011C: bf 0x20EDE7C
00000120: push.imm.e 242
00000124: pop.v.i sprite_index
0000012C: push.local.v local.direttorio
00000134: push.d 22.5
00000140: cmp.d.v >
00000144: bf 0x20EDEB8
00000148: push.local.v local.direttorio
00000150: push.imm.e 45
00000154: cmp.i.v <=
00000158: bf 0x20EDEB8
0000015C: push.imm.e 243
00000160: pop.v.i sprite_index
00000168: push.local.v local.direttorio
00000170: push.imm.e 45
00000174: cmp.i.v >
00000178: bf 0x20EDEF4
0000017C: push.local.v local.direttorio
00000184: push.d 67.5
00000190: cmp.d.v <=
00000194: bf 0x20EDEF4
00000198: push.imm.e 244
0000019C: pop.v.i sprite_index
000001A4: push.local.v local.direttorio
000001AC: push.d 67.5
000001B8: cmp.d.v >
000001BC: bf 0x20EDF30
000001C0: push.local.v local.direttorio
000001C8: push.imm.e 90
000001CC: cmp.i.v <=
000001D0: bf 0x20EDF30
000001D4: push.imm.e 245
000001D8: pop.v.i sprite_index
000001E0: push.local.v local.direttorio
000001E8: push.imm.e 90
000001EC: cmp.i.v >
000001F0: bf 0x20EDF6C
000001F4: push.local.v local.direttorio
000001FC: push.d 112.5
00000208: cmp.d.v <=
0000020C: bf 0x20EDF6C
00000210: push.imm.e 246
00000214: pop.v.i sprite_index
0000021C: push.local.v local.direttorio
00000224: push.d 112.5
00000230: cmp.d.v >
00000234: bf 0x20EDFA8
00000238: push.local.v local.direttorio
00000240: push.imm.e 135
00000244: cmp.i.v <=
00000248: bf 0x20EDFA8
0000024C: push.imm.e 247
00000250: pop.v.i sprite_index
00000258: push.local.v local.direttorio
00000260: push.imm.e 135
00000264: cmp.i.v >
00000268: bf 0x20EDFE4
0000026C: push.local.v local.direttorio
00000274: push.d 157.5
00000280: cmp.d.v <=
00000284: bf 0x20EDFE4
00000288: push.imm.e 248
0000028C: pop.v.i sprite_index
00000294: push.local.v local.direttorio
0000029C: push.d 157.5
000002A8: cmp.d.v >
000002AC: bf 0x20EE020
000002B0: push.local.v local.direttorio
000002B8: push.imm.e 180
000002BC: cmp.i.v <=
000002C0: bf 0x20EE020
000002C4: push.imm.e 249
000002C8: pop.v.i sprite_index
000002D0: push.local.v local.direttorio
000002D8: push.imm.e 180
000002DC: cmp.i.v >
000002E0: bf 0x20EE05C
000002E4: push.local.v local.direttorio
000002EC: push.d 202.5
000002F8: cmp.d.v <=
000002FC: bf 0x20EE05C
00000300: push.imm.e 250
00000304: pop.v.i sprite_index
0000030C: push.local.v local.direttorio
00000314: push.d 202.5
00000320: cmp.d.v >
00000324: bf 0x20EE098
00000328: push.local.v local.direttorio
00000330: push.imm.e 225
00000334: cmp.i.v <=
00000338: bf 0x20EE098
0000033C: push.imm.e 251
00000340: pop.v.i sprite_index
00000348: push.local.v local.direttorio
00000350: push.imm.e 225
00000354: cmp.i.v >
00000358: bf 0x20EE0D4
0000035C: push.local.v local.direttorio
00000364: push.d 247.5
00000370: cmp.d.v <=
00000374: bf 0x20EE0D4
00000378: push.imm.e 252
0000037C: pop.v.i sprite_index
00000384: push.local.v local.direttorio
0000038C: push.d 247.5
00000398: cmp.d.v >
0000039C: bf 0x20EE110
000003A0: push.local.v local.direttorio
000003A8: push.imm.e 270
000003AC: cmp.i.v <=
000003B0: bf 0x20EE110
000003B4: push.imm.e 253
000003B8: pop.v.i sprite_index
000003C0: push.local.v local.direttorio
000003C8: push.imm.e 270
000003CC: cmp.i.v >
000003D0: bf 0x20EE14C
000003D4: push.local.v local.direttorio
000003DC: push.d 292.5
000003E8: cmp.d.v <=
000003EC: bf 0x20EE14C
000003F0: push.imm.e 254
000003F4: pop.v.i sprite_index
000003FC: push.local.v local.direttorio
00000404: push.d 292.5
00000410: cmp.d.v >
00000414: bf 0x20EE188
00000418: push.local.v local.direttorio
00000420: push.imm.e 315
00000424: cmp.i.v <=
00000428: bf 0x20EE188
0000042C: push.imm.e 255
00000430: pop.v.i sprite_index
00000438: push.local.v local.direttorio
00000440: push.imm.e 315
00000444: cmp.i.v >
00000448: bf 0x20EE1C4
0000044C: push.local.v local.direttorio
00000454: push.d 337.5
00000460: cmp.d.v <=
00000464: bf 0x20EE1C4
00000468: push.imm.e 240
0000046C: pop.v.i sprite_index
00000474: push.local.v local.direttorio
0000047C: push.d 337.5
00000488: cmp.d.v >
0000048C: bf 0x20EE200
00000490: push.local.v local.direttorio
00000498: push.imm.e 360
0000049C: cmp.i.v <=
000004A0: bf 0x20EE200
000004A4: push.imm.e 241
000004A8: pop.v.i sprite_index
000004B0: push.imm.e 3
000004B4: conv.i.v
000004B8: push.imm.e 0
000004BC: conv.i.v
000004C0: push.v life
000004C8: call action_if_variable(argc=3)
000004D0: pop.v.v local.__b__
000004D8: push.local.v local.__b__
000004E0: conv.v.b
000004E4: bf 0x20EE28C
000004E8: push.imm.e 0
000004EC: conv.i.v
000004F0: push.imm.e 0
000004F4: conv.i.v
000004F8: push.imm.e 260
000004FC: conv.i.v
00000500: call action_create_object(argc=3)
00000508: popz
0000050C: push.imm.e 0
00000510: conv.i.v
00000514: push.imm.e 0
00000518: conv.i.v
0000051C: push.imm.e 450
00000520: conv.i.v
00000524: call action_create_object(argc=3)
0000052C: popz
00000530: call action_kill_object(argc=0)
00000538: popz
0000053C: push.imm.e 0
00000540: conv.i.v
00000544: push.imm.e 0
00000548: conv.i.v
0000054C: push.imm.e 127
00000550: conv.i.v
00000554: call action_if_number(argc=3)
0000055C: pop.v.v local.__b__
00000564: push.local.v local.__b__
0000056C: conv.v.b
00000570: bf 0x20EE510
00000574: push.imm.e 0
00000578: conv.i.v
0000057C: push.imm.e 1
00000580: conv.i.v
00000584: push.v redder
0000058C: call action_if_variable(argc=3)
00000594: pop.v.v local.__b__
0000059C: push.local.v local.__b__
000005A4: conv.v.b
000005A8: bf 0x20EE510
000005AC: push.imm.e 455
000005B0: pushenv 0x20EE340
000005B4: push.imm.e 0
000005B8: conv.i.v
000005BC: push.imm.e 1
000005C0: conv.i.v
000005C4: push.v night
000005CC: call action_if_variable(argc=3)
000005D4: pop.v.v local.__b__
000005DC: push.local.v local.__b__
000005E4: conv.v.b
000005E8: bf 0x20EE340
000005EC: b 0x20EE348
000005F0: popenv 0x40EE304
000005F4: b 0x20EE34C
000005F8: popenv 0x1CEE348
000005FC: push.local.v local.__b__
00000604: conv.v.b
00000608: bf 0x20EE37C
0000060C: push.imm.e 1
00000610: conv.i.v
00000614: push.i 16366009
0000061C: conv.i.v
00000620: call action_sprite_color(argc=2)
00000628: popz
0000062C: push.imm.e 455
00000630: pushenv 0x20EE3C0
00000634: push.imm.e 0
00000638: conv.i.v
0000063C: push.imm.e 1
00000640: conv.i.v
00000644: push.v dawn
0000064C: call action_if_variable(argc=3)
00000654: pop.v.v local.__b__
0000065C: push.local.v local.__b__
00000664: conv.v.b
00000668: bf 0x20EE3C0
0000066C: b 0x20EE3C8
00000670: popenv 0x40EE384
00000674: b 0x20EE3CC
00000678: popenv 0x1CEE3C8
0000067C: push.local.v local.__b__
00000684: conv.v.b
00000688: bf 0x20EE3FC
0000068C: push.imm.e 1
00000690: conv.i.v
00000694: push.i 15201023
0000069C: conv.i.v
000006A0: call action_sprite_color(argc=2)
000006A8: popz
000006AC: push.imm.e 455
000006B0: pushenv 0x20EE440
000006B4: push.imm.e 0
000006B8: conv.i.v
000006BC: push.imm.e 0
000006C0: conv.i.v
000006C4: push.v dawn
000006CC: call action_if_variable(argc=3)
000006D4: pop.v.v local.__b__
000006DC: push.local.v local.__b__
000006E4: conv.v.b
000006E8: bf 0x20EE440
000006EC: b 0x20EE448
000006F0: popenv 0x40EE404
000006F4: b 0x20EE44C
000006F8: popenv 0x1CEE448
000006FC: push.local.v local.__b__
00000704: conv.v.b
00000708: bf 0x20EE4DC
0000070C: push.imm.e 455
00000710: pushenv 0x20EE4A0
00000714: push.imm.e 0
00000718: conv.i.v
0000071C: push.imm.e 0
00000720: conv.i.v
00000724: push.v night
0000072C: call action_if_variable(argc=3)
00000734: pop.v.v local.__b__
0000073C: push.local.v local.__b__
00000744: conv.v.b
00000748: bf 0x20EE4A0
0000074C: b 0x20EE4A8
00000750: popenv 0x40EE464
00000754: b 0x20EE4AC
00000758: popenv 0x1CEE4A8
0000075C: push.local.v local.__b__
00000764: conv.v.b
00000768: bf 0x20EE4DC
0000076C: push.imm.e 1
00000770: conv.i.v
00000774: push.i 16777215
0000077C: conv.i.v
00000780: call action_sprite_color(argc=2)
00000788: popz
0000078C: push.imm.e 0
00000790: conv.i.v
00000794: call action_set_relative(argc=1)
0000079C: popz
000007A0: push.imm.e 0
000007A4: pop.v.i redder
000007AC: push.imm.e 1
000007B0: conv.i.v
000007B4: call action_set_relative(argc=1)
000007BC: popz
000007C0: push.imm.e 0
000007C4: conv.i.v
000007C8: push.imm.e 1
000007CC: conv.i.v
000007D0: push.imm.e 127
000007D4: conv.i.v
000007D8: call action_if_number(argc=3)
000007E0: pop.v.v local.__b__
000007E8: push.local.v local.__b__
000007F0: conv.v.b
000007F4: bf 0x20EE59C
000007F8: push.imm.e 0
000007FC: conv.i.v
00000800: push.imm.e 1
00000804: conv.i.v
00000808: push.v redder
00000810: call action_if_variable(argc=3)
00000818: pop.v.v local.__b__
00000820: push.local.v local.__b__
00000828: conv.v.b
0000082C: bf 0x20EE59C
00000830: push.imm.e 1
00000834: conv.i.v
00000838: push.imm.e 255
0000083C: conv.i.v
00000840: call action_sprite_color(argc=2)
00000848: popz
0000084C: push.imm.e 2
00000850: conv.i.v
00000854: push.imm.e 0
00000858: conv.i.v
0000085C: push.imm.e 15
00000860: conv.i.v
00000864: call action_if_number(argc=3)
0000086C: pop.v.v local.__b__
00000874: push.local.v local.__b__
0000087C: conv.v.b
00000880: bf 0x20EF030
00000884: push.imm.e 1
00000888: conv.i.v
0000088C: push.imm.e 250
00000890: conv.i.v
00000894: push.imm.e 16
00000898: conv.i.v
0000089C: call distance_to_object(argc=1)
000008A4: call action_if_variable(argc=3)
000008AC: pop.v.v local.__b__
000008B4: push.local.v local.__b__
000008BC: conv.v.b
000008C0: bf 0x20EF030
000008C4: push.imm.e 0
000008C8: conv.i.v
000008CC: push.imm.e 1
000008D0: conv.i.v
000008D4: push.v launching
000008DC: call action_if_variable(argc=3)
000008E4: pop.v.v local.__b__
000008EC: push.local.v local.__b__
000008F4: conv.v.b
000008F8: bf 0x20EF030
000008FC: push.imm.e 0
00000900: conv.i.v
00000904: call action_set_relative(argc=1)
0000090C: popz
00000910: push.imm.e 0
00000914: pop.v.i launching
0000091C: push.imm.e 1
00000920: conv.i.v
00000924: call action_set_relative(argc=1)
0000092C: popz
00000930: push.imm.e 0
00000934: conv.i.v
00000938: call action_set_relative(argc=1)
00000940: popz
00000944: push.imm.e 6
00000948: conv.i.v
0000094C: push.imm.e 40
00000950: conv.i.v
00000954: call action_set_alarm(argc=2)
0000095C: popz
00000960: push.imm.e 1
00000964: conv.i.v
00000968: call action_set_relative(argc=1)
00000970: popz
00000974: push.local.v local.direttorio
0000097C: push.d 22.5
00000988: cmp.d.v <=
0000098C: bf 0x20EE748
00000990: push.imm.e 293
00000994: conv.i.v
00000998: push.v y
000009A0: push.imm.e 125
000009A4: sub.i.v
000009A8: push.v x
000009B0: push.imm.e 46
000009B4: add.i.v
000009B8: call instance_create(argc=3)
000009C0: popz
000009C4: push.imm.e 608
000009C8: conv.i.v
000009CC: push.v y
000009D4: push.imm.e 125
000009D8: sub.i.v
000009DC: push.v x
000009E4: push.imm.e 46
000009E8: add.i.v
000009EC: call instance_create(argc=3)
000009F4: popz
000009F8: push.local.v local.direttorio
00000A00: push.d 22.5
00000A0C: cmp.d.v >
00000A10: bf 0x20EE7E0
00000A14: push.local.v local.direttorio
00000A1C: push.imm.e 45
00000A20: cmp.i.v <=
00000A24: bf 0x20EE7E0
00000A28: push.imm.e 293
00000A2C: conv.i.v
00000A30: push.v y
00000A38: push.imm.e 129
00000A3C: sub.i.v
00000A40: push.v x
00000A48: push.imm.e 27
00000A4C: add.i.v
00000A50: call instance_create(argc=3)
00000A58: popz
00000A5C: push.imm.e 608
00000A60: conv.i.v
00000A64: push.v y
00000A6C: push.imm.e 129
00000A70: sub.i.v
00000A74: push.v x
00000A7C: push.imm.e 27
00000A80: add.i.v
00000A84: call instance_create(argc=3)
00000A8C: popz
00000A90: push.local.v local.direttorio
00000A98: push.imm.e 45
00000A9C: cmp.i.v >
00000AA0: bf 0x20EE878
00000AA4: push.local.v local.direttorio
00000AAC: push.d 67.5
00000AB8: cmp.d.v <=
00000ABC: bf 0x20EE878
00000AC0: push.imm.e 293
00000AC4: conv.i.v
00000AC8: push.v y
00000AD0: push.imm.e 128
00000AD4: sub.i.v
00000AD8: push.v x
00000AE0: push.imm.e 6
00000AE4: add.i.v
00000AE8: call instance_create(argc=3)
00000AF0: popz
00000AF4: push.imm.e 608
00000AF8: conv.i.v
00000AFC: push.v y
00000B04: push.imm.e 128
00000B08: sub.i.v
00000B0C: push.v x
00000B14: push.imm.e 6
00000B18: add.i.v
00000B1C: call instance_create(argc=3)
00000B24: popz
00000B28: push.local.v local.direttorio
00000B30: push.d 67.5
00000B3C: cmp.d.v >
00000B40: bf 0x20EE910
00000B44: push.local.v local.direttorio
00000B4C: push.imm.e 90
00000B50: cmp.i.v <=
00000B54: bf 0x20EE910
00000B58: push.imm.e 293
00000B5C: conv.i.v
00000B60: push.v y
00000B68: push.imm.e 127
00000B6C: sub.i.v
00000B70: push.v x
00000B78: push.imm.e 15
00000B7C: sub.i.v
00000B80: call instance_create(argc=3)
00000B88: popz
00000B8C: push.imm.e 608
00000B90: conv.i.v
00000B94: push.v y
00000B9C: push.imm.e 127
00000BA0: sub.i.v
00000BA4: push.v x
00000BAC: push.imm.e 15
00000BB0: sub.i.v
00000BB4: call instance_create(argc=3)
00000BBC: popz
00000BC0: push.local.v local.direttorio
00000BC8: push.imm.e 90
00000BCC: cmp.i.v >
00000BD0: bf 0x20EE9A8
00000BD4: push.local.v local.direttorio
00000BDC: push.d 112.5
00000BE8: cmp.d.v <=
00000BEC: bf 0x20EE9A8
00000BF0: push.imm.e 293
00000BF4: conv.i.v
00000BF8: push.v y
00000C00: push.imm.e 119
00000C04: sub.i.v
00000C08: push.v x
00000C10: push.imm.e 34
00000C14: sub.i.v
00000C18: call instance_create(argc=3)
00000C20: popz
00000C24: push.imm.e 608
00000C28: conv.i.v
00000C2C: push.v y
00000C34: push.imm.e 119
00000C38: sub.i.v
00000C3C: push.v x
00000C44: push.imm.e 24
00000C48: sub.i.v
00000C4C: call instance_create(argc=3)
00000C54: popz
00000C58: push.local.v local.direttorio
00000C60: push.d 112.5
00000C6C: cmp.d.v >
00000C70: bf 0x20EEA40
00000C74: push.local.v local.direttorio
00000C7C: push.imm.e 135
00000C80: cmp.i.v <=
00000C84: bf 0x20EEA40
00000C88: push.imm.e 293
00000C8C: conv.i.v
00000C90: push.v y
00000C98: push.imm.e 107
00000C9C: sub.i.v
00000CA0: push.v x
00000CA8: push.imm.e 46
00000CAC: sub.i.v
00000CB0: call instance_create(argc=3)
00000CB8: popz
00000CBC: push.imm.e 608
00000CC0: conv.i.v
00000CC4: push.v y
00000CCC: push.imm.e 107
00000CD0: sub.i.v
00000CD4: push.v x
00000CDC: push.imm.e 46
00000CE0: sub.i.v
00000CE4: call instance_create(argc=3)
00000CEC: popz
00000CF0: push.local.v local.direttorio
00000CF8: push.imm.e 135
00000CFC: cmp.i.v >
00000D00: bf 0x20EEAD8
00000D04: push.local.v local.direttorio
00000D0C: push.d 157.5
00000D18: cmp.d.v <=
00000D1C: bf 0x20EEAD8
00000D20: push.imm.e 293
00000D24: conv.i.v
00000D28: push.v y
00000D30: push.imm.e 91
00000D34: sub.i.v
00000D38: push.v x
00000D40: push.imm.e 55
00000D44: sub.i.v
00000D48: call instance_create(argc=3)
00000D50: popz
00000D54: push.imm.e 613
00000D58: conv.i.v
00000D5C: push.v y
00000D64: push.imm.e 91
00000D68: sub.i.v
00000D6C: push.v x
00000D74: push.imm.e 55
00000D78: sub.i.v
00000D7C: call instance_create(argc=3)
00000D84: popz
00000D88: push.local.v local.direttorio
00000D90: push.d 157.5
00000D9C: cmp.d.v >
00000DA0: bf 0x20EEB70
00000DA4: push.local.v local.direttorio
00000DAC: push.imm.e 180
00000DB0: cmp.i.v <=
00000DB4: bf 0x20EEB70
00000DB8: push.imm.e 293
00000DBC: conv.i.v
00000DC0: push.v y
00000DC8: push.imm.e 79
00000DCC: sub.i.v
00000DD0: push.v x
00000DD8: push.imm.e 51
00000DDC: sub.i.v
00000DE0: call instance_create(argc=3)
00000DE8: popz
00000DEC: push.imm.e 613
00000DF0: conv.i.v
00000DF4: push.v y
00000DFC: push.imm.e 79
00000E00: sub.i.v
00000E04: push.v x
00000E0C: push.imm.e 51
00000E10: sub.i.v
00000E14: call instance_create(argc=3)
00000E1C: popz
00000E20: push.local.v local.direttorio
00000E28: push.imm.e 180
00000E2C: cmp.i.v >
00000E30: bf 0x20EEC08
00000E34: push.local.v local.direttorio
00000E3C: push.d 202.5
00000E48: cmp.d.v <=
00000E4C: bf 0x20EEC08
00000E50: push.imm.e 293
00000E54: conv.i.v
00000E58: push.v y
00000E60: push.imm.e 81
00000E64: sub.i.v
00000E68: push.v x
00000E70: push.imm.e 44
00000E74: sub.i.v
00000E78: call instance_create(argc=3)
00000E80: popz
00000E84: push.imm.e 613
00000E88: conv.i.v
00000E8C: push.v y
00000E94: push.imm.e 81
00000E98: sub.i.v
00000E9C: push.v x
00000EA4: push.imm.e 44
00000EA8: sub.i.v
00000EAC: call instance_create(argc=3)
00000EB4: popz
00000EB8: push.local.v local.direttorio
00000EC0: push.d 202.5
00000ECC: cmp.d.v >
00000ED0: bf 0x20EECA0
00000ED4: push.local.v local.direttorio
00000EDC: push.imm.e 225
00000EE0: cmp.i.v <=
00000EE4: bf 0x20EECA0
00000EE8: push.imm.e 293
00000EEC: conv.i.v
00000EF0: push.v y
00000EF8: push.imm.e 73
00000EFC: sub.i.v
00000F00: push.v x
00000F08: push.imm.e 30
00000F0C: sub.i.v
00000F10: call instance_create(argc=3)
00000F18: popz
00000F1C: push.imm.e 613
00000F20: conv.i.v
00000F24: push.v y
00000F2C: push.imm.e 73
00000F30: sub.i.v
00000F34: push.v x
00000F3C: push.imm.e 30
00000F40: sub.i.v
00000F44: call instance_create(argc=3)
00000F4C: popz
00000F50: push.local.v local.direttorio
00000F58: push.imm.e 225
00000F5C: cmp.i.v >
00000F60: bf 0x20EED38
00000F64: push.local.v local.direttorio
00000F6C: push.d 247.5
00000F78: cmp.d.v <=
00000F7C: bf 0x20EED38
00000F80: push.imm.e 293
00000F84: conv.i.v
00000F88: push.v y
00000F90: push.imm.e 68
00000F94: sub.i.v
00000F98: push.v x
00000FA0: push.imm.e 11
00000FA4: sub.i.v
00000FA8: call instance_create(argc=3)
00000FB0: popz
00000FB4: push.imm.e 613
00000FB8: conv.i.v
00000FBC: push.v y
00000FC4: push.imm.e 68
00000FC8: sub.i.v
00000FCC: push.v x
00000FD4: push.imm.e 11
00000FD8: sub.i.v
00000FDC: call instance_create(argc=3)
00000FE4: popz
00000FE8: push.local.v local.direttorio
00000FF0: push.d 247.5
00000FFC: cmp.d.v >
00001000: bf 0x20EEDD0
00001004: push.local.v local.direttorio
0000100C: push.imm.e 270
00001010: cmp.i.v <=
00001014: bf 0x20EEDD0
00001018: push.imm.e 293
0000101C: conv.i.v
00001020: push.v y
00001028: push.imm.e 68
0000102C: sub.i.v
00001030: push.v x
00001038: push.imm.e 9
0000103C: add.i.v
00001040: call instance_create(argc=3)
00001048: popz
0000104C: push.imm.e 613
00001050: conv.i.v
00001054: push.v y
0000105C: push.imm.e 68
00001060: sub.i.v
00001064: push.v x
0000106C: push.imm.e 9
00001070: add.i.v
00001074: call instance_create(argc=3)
0000107C: popz
00001080: push.local.v local.direttorio
00001088: push.imm.e 270
0000108C: cmp.i.v >
00001090: bf 0x20EEE68
00001094: push.local.v local.direttorio
0000109C: push.d 292.5
000010A8: cmp.d.v <=
000010AC: bf 0x20EEE68
000010B0: push.imm.e 293
000010B4: conv.i.v
000010B8: push.v y
000010C0: push.imm.e 75
000010C4: sub.i.v
000010C8: push.v x
000010D0: push.imm.e 29
000010D4: add.i.v
000010D8: call instance_create(argc=3)
000010E0: popz
000010E4: push.imm.e 613
000010E8: conv.i.v
000010EC: push.v y
000010F4: push.imm.e 75
000010F8: sub.i.v
000010FC: push.v x
00001104: push.imm.e 29
00001108: add.i.v
0000110C: call instance_create(argc=3)
00001114: popz
00001118: push.local.v local.direttorio
00001120: push.d 292.5
0000112C: cmp.d.v >
00001130: bf 0x20EEF00
00001134: push.local.v local.direttorio
0000113C: push.imm.e 315
00001140: cmp.i.v <=
00001144: bf 0x20EEF00
00001148: push.imm.e 293
0000114C: conv.i.v
00001150: push.v y
00001158: push.imm.e 82
0000115C: sub.i.v
00001160: push.v x
00001168: push.imm.e 43
0000116C: add.i.v
00001170: call instance_create(argc=3)
00001178: popz
0000117C: push.imm.e 608
00001180: conv.i.v
00001184: push.v y
0000118C: push.imm.e 82
00001190: sub.i.v
00001194: push.v x
0000119C: push.imm.e 43
000011A0: add.i.v
000011A4: call instance_create(argc=3)
000011AC: popz
000011B0: push.local.v local.direttorio
000011B8: push.imm.e 315
000011BC: cmp.i.v >
000011C0: bf 0x20EEF98
000011C4: push.local.v local.direttorio
000011CC: push.d 337.5
000011D8: cmp.d.v <=
000011DC: bf 0x20EEF98
000011E0: push.imm.e 293
000011E4: conv.i.v
000011E8: push.v y
000011F0: push.imm.e 96
000011F4: sub.i.v
000011F8: push.v x
00001200: push.imm.e 64
00001204: add.i.v
00001208: call instance_create(argc=3)
00001210: popz
00001214: push.imm.e 608
00001218: conv.i.v
0000121C: push.v y
00001224: push.imm.e 96
00001228: sub.i.v
0000122C: push.v x
00001234: push.imm.e 64
00001238: add.i.v
0000123C: call instance_create(argc=3)
00001244: popz
00001248: push.local.v local.direttorio
00001250: push.d 337.5
0000125C: cmp.d.v >
00001260: bf 0x20EF030
00001264: push.local.v local.direttorio
0000126C: push.imm.e 360
00001270: cmp.i.v <=
00001274: bf 0x20EF030
00001278: push.imm.e 293
0000127C: conv.i.v
00001280: push.v y
00001288: push.imm.e 111
0000128C: sub.i.v
00001290: push.v x
00001298: push.imm.e 60
0000129C: add.i.v
000012A0: call instance_create(argc=3)
000012A8: popz
000012AC: push.imm.e 608
000012B0: conv.i.v
000012B4: push.v y
000012BC: push.imm.e 111
000012C0: sub.i.v
000012C4: push.v x
000012CC: push.imm.e 60
000012D0: add.i.v
000012D4: call instance_create(argc=3)
000012DC: popz
000012E0: push.imm.e 0
000012E4: conv.i.v
000012E8: call action_set_relative(argc=1)
000012F0: popz