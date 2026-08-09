// gml_Object_impa31f_Alarm_0  locals=2 args=0 len=1608
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v demos
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x2140AB0
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 24
00000058: conv.i.v
0000005C: call action_set_alarm(argc=2)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 18
00000074: conv.i.v
00000078: push.v phase
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x21406B4
000000A0: push.imm.e 1
000000A4: conv.i.v
000000A8: call action_set_relative(argc=1)
000000B0: popz
000000B4: push.imm.e -268
000000B8: conv.i.v
000000BC: push.imm.e -24
000000C0: conv.i.v
000000C4: push.imm.e 486
000000C8: conv.i.v
000000CC: call action_create_object(argc=3)
000000D4: popz
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: push.imm.e 1
000000F0: conv.i.v
000000F4: call action_set_relative(argc=1)
000000FC: popz
00000100: push.imm.e -257
00000104: conv.i.v
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.imm.e 491
00000114: conv.i.v
00000118: call action_create_object(argc=3)
00000120: popz
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: call action_set_relative(argc=1)
00000134: popz
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz
0000014C: push.v phase
00000154: push.imm.e 1
00000158: add.i.v
0000015C: pop.v.v phase
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz
00000178: push.v phase
00000180: push.imm.e 1
00000184: cmp.i.v ==
00000188: bf 0x21406F0
0000018C: push.imm.e 42
00000190: pop.v.i sprite_index
00000198: push.v phase
000001A0: push.imm.e 1
000001A4: add.i.v
000001A8: pop.v.v phase
000001B0: exit
000001B4: push.v phase
000001BC: push.imm.e 2
000001C0: cmp.i.v ==
000001C4: bf 0x214072C
000001C8: push.imm.e 40
000001CC: pop.v.i sprite_index
000001D4: push.v phase
000001DC: push.imm.e 1
000001E0: add.i.v
000001E4: pop.v.v phase
000001EC: exit
000001F0: push.v phase
000001F8: push.imm.e 3
000001FC: cmp.i.v ==
00000200: bf 0x2140768
00000204: push.imm.e 38
00000208: pop.v.i sprite_index
00000210: push.v phase
00000218: push.imm.e 1
0000021C: add.i.v
00000220: pop.v.v phase
00000228: exit
0000022C: push.v phase
00000234: push.imm.e 4
00000238: cmp.i.v ==
0000023C: bf 0x21407A4
00000240: push.imm.e 36
00000244: pop.v.i sprite_index
0000024C: push.v phase
00000254: push.imm.e 1
00000258: add.i.v
0000025C: pop.v.v phase
00000264: exit
00000268: push.v phase
00000270: push.imm.e 5
00000274: cmp.i.v ==
00000278: bf 0x21407E0
0000027C: push.imm.e 34
00000280: pop.v.i sprite_index
00000288: push.v phase
00000290: push.imm.e 1
00000294: add.i.v
00000298: pop.v.v phase
000002A0: exit
000002A4: push.v phase
000002AC: push.imm.e 6
000002B0: cmp.i.v ==
000002B4: bf 0x214081C
000002B8: push.imm.e 32
000002BC: pop.v.i sprite_index
000002C4: push.v phase
000002CC: push.imm.e 1
000002D0: add.i.v
000002D4: pop.v.v phase
000002DC: exit
000002E0: push.v phase
000002E8: push.imm.e 7
000002EC: cmp.i.v ==
000002F0: bf 0x2140858
000002F4: push.imm.e 30
000002F8: pop.v.i sprite_index
00000300: push.v phase
00000308: push.imm.e 1
0000030C: add.i.v
00000310: pop.v.v phase
00000318: exit
0000031C: push.v phase
00000324: push.imm.e 8
00000328: cmp.i.v ==
0000032C: bf 0x2140894
00000330: push.imm.e 28
00000334: pop.v.i sprite_index
0000033C: push.v phase
00000344: push.imm.e 1
00000348: add.i.v
0000034C: pop.v.v phase
00000354: exit
00000358: push.v phase
00000360: push.imm.e 9
00000364: cmp.i.v ==
00000368: bf 0x21408D0
0000036C: push.imm.e 26
00000370: pop.v.i sprite_index
00000378: push.v phase
00000380: push.imm.e 1
00000384: add.i.v
00000388: pop.v.v phase
00000390: exit
00000394: push.v phase
0000039C: push.imm.e 10
000003A0: cmp.i.v ==
000003A4: bf 0x214090C
000003A8: push.imm.e 24
000003AC: pop.v.i sprite_index
000003B4: push.v phase
000003BC: push.imm.e 1
000003C0: add.i.v
000003C4: pop.v.v phase
000003CC: exit
000003D0: push.v phase
000003D8: push.imm.e 11
000003DC: cmp.i.v ==
000003E0: bf 0x2140948
000003E4: push.imm.e 22
000003E8: pop.v.i sprite_index
000003F0: push.v phase
000003F8: push.imm.e 1
000003FC: add.i.v
00000400: pop.v.v phase
00000408: exit
0000040C: push.v phase
00000414: push.imm.e 12
00000418: cmp.i.v ==
0000041C: bf 0x2140984
00000420: push.imm.e 20
00000424: pop.v.i sprite_index
0000042C: push.v phase
00000434: push.imm.e 1
00000438: add.i.v
0000043C: pop.v.v phase
00000444: exit
00000448: push.v phase
00000450: push.imm.e 13
00000454: cmp.i.v ==
00000458: bf 0x21409C0
0000045C: push.imm.e 18
00000460: pop.v.i sprite_index
00000468: push.v phase
00000470: push.imm.e 1
00000474: add.i.v
00000478: pop.v.v phase
00000480: exit
00000484: push.v phase
0000048C: push.imm.e 14
00000490: cmp.i.v ==
00000494: bf 0x21409FC
00000498: push.imm.e 16
0000049C: pop.v.i sprite_index
000004A4: push.v phase
000004AC: push.imm.e 1
000004B0: add.i.v
000004B4: pop.v.v phase
000004BC: exit
000004C0: push.v phase
000004C8: push.imm.e 15
000004CC: cmp.i.v ==
000004D0: bf 0x2140A38
000004D4: push.imm.e 14
000004D8: pop.v.i sprite_index
000004E0: push.v phase
000004E8: push.imm.e 1
000004EC: add.i.v
000004F0: pop.v.v phase
000004F8: exit
000004FC: push.v phase
00000504: push.imm.e 16
00000508: cmp.i.v ==
0000050C: bf 0x2140A74
00000510: push.imm.e 12
00000514: pop.v.i sprite_index
0000051C: push.v phase
00000524: push.imm.e 1
00000528: add.i.v
0000052C: pop.v.v phase
00000534: exit
00000538: push.v phase
00000540: push.imm.e 17
00000544: cmp.i.v ==
00000548: bf 0x2140AB0
0000054C: push.imm.e 10
00000550: pop.v.i sprite_index
00000558: push.v phase
00000560: push.imm.e 1
00000564: add.i.v
00000568: pop.v.v phase
00000570: exit
00000574: push.imm.e 156
00000578: pushenv 0x2140AF4
0000057C: push.imm.e 2
00000580: conv.i.v
00000584: push.imm.e -1000
00000588: conv.i.v
0000058C: push.v ele
00000594: call action_if_variable(argc=3)
0000059C: pop.v.v local.__b__
000005A4: push.local.v local.__b__
000005AC: conv.v.b
000005B0: bf 0x2140AF4
000005B4: b 0x2140AFC
000005B8: popenv 0x4140AB8
000005BC: b 0x2140B00
000005C0: popenv 0x1D40AFC
000005C4: push.local.v local.__b__
000005CC: conv.v.b
000005D0: bf 0x2140B70
000005D4: push.imm.e 156
000005D8: pushenv 0x2140B54
000005DC: push.imm.e 2
000005E0: conv.i.v
000005E4: push.imm.e -1000
000005E8: conv.i.v
000005EC: push.v mon
000005F4: call action_if_variable(argc=3)
000005FC: pop.v.v local.__b__
00000604: push.local.v local.__b__
0000060C: conv.v.b
00000610: bf 0x2140B54
00000614: b 0x2140B5C
00000618: popenv 0x4140B18
0000061C: b 0x2140B60
00000620: popenv 0x1D40B5C
00000624: push.local.v local.__b__
0000062C: conv.v.b
00000630: bf 0x2140B70
00000634: push.imm.e 0
00000638: conv.i.v
0000063C: call action_set_relative(argc=1)
00000644: popz