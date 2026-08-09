// gml_Object_upcrc12_Mouse_4  locals=2 args=0 len=1724
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.builtin.v os_type
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20FD1A8
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20FCEEC
00000084: push.imm.e 1
00000088: pop.v.i phase
00000090: push.imm.e 1
00000094: conv.i.v
00000098: call action_set_relative(argc=1)
000000A0: popz
000000A4: push.imm.e -50
000000A8: conv.i.v
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 694
000000B8: conv.i.v
000000BC: call action_create_object(argc=3)
000000C4: popz
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: b 0x20FD1A8
000000E0: push.imm.e 156
000000E4: pushenv 0x20FCF30
000000E8: push.imm.e 4
000000EC: conv.i.v
000000F0: push.imm.e 5000
000000F4: conv.i.v
000000F8: push.v mon
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20FCF30
00000120: b 0x20FCF38
00000124: popenv 0x40FCEF4
00000128: b 0x20FCF3C
0000012C: popenv 0x1CFCF38
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20FD1A8
00000140: push.imm.e 156
00000144: pushenv 0x20FCF90
00000148: push.imm.e 4
0000014C: conv.i.v
00000150: push.imm.e 3000
00000154: conv.i.v
00000158: push.v oil
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x20FCF90
00000180: b 0x20FCF98
00000184: popenv 0x40FCF54
00000188: b 0x20FCF9C
0000018C: popenv 0x1CFCF98
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20FD1A8
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 0
000001AC: conv.i.v
000001B0: push.v avata
000001B8: call action_if_variable(argc=3)
000001C0: pop.v.v local.__b__
000001C8: push.local.v local.__b__
000001D0: conv.v.b
000001D4: bf 0x20FD1A8
000001D8: push.imm.e 154
000001DC: pushenv 0x20FCFF8
000001E0: push.imm.e 4
000001E4: pop.v.i level
000001EC: popenv 0x40FCFEC
000001F0: push.imm.e 1
000001F4: pop.v.i avata
000001FC: push.imm.e 156
00000200: pushenv 0x20FD050
00000204: push.imm.e 1
00000208: conv.i.v
0000020C: call action_set_relative(argc=1)
00000214: popz
00000218: push.v mon
00000220: push.imm.e -5000
00000224: add.i.v
00000228: pop.v.v mon
00000230: push.imm.e 0
00000234: conv.i.v
00000238: call action_set_relative(argc=1)
00000240: popz
00000244: popenv 0x40FD010
00000248: push.imm.e 156
0000024C: pushenv 0x20FD09C
00000250: push.imm.e 1
00000254: conv.i.v
00000258: call action_set_relative(argc=1)
00000260: popz
00000264: push.v oil
0000026C: push.imm.e -3000
00000270: add.i.v
00000274: pop.v.v oil
0000027C: push.imm.e 0
00000280: conv.i.v
00000284: call action_set_relative(argc=1)
0000028C: popz
00000290: popenv 0x40FD05C
00000294: push.imm.e 1
00000298: conv.i.v
0000029C: call action_set_relative(argc=1)
000002A4: popz
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: push.i 3989790
000002B8: conv.i.v
000002BC: push.imm.e 1
000002C0: conv.i.v
000002C4: push.imm.e -50
000002C8: conv.i.v
000002CC: push.imm.e 0
000002D0: conv.i.v
000002D4: push.imm.e 1
000002D8: conv.i.v
000002DC: call action_effect(argc=6)
000002E4: popz
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: call action_set_relative(argc=1)
000002F8: popz
000002FC: push.imm.e 694
00000300: pushenv 0x20FD11C
00000304: call action_kill_object(argc=0)
0000030C: popz
00000310: popenv 0x40FD110
00000314: push.imm.e 336
00000318: pushenv 0x20FD134
0000031C: call action_kill_object(argc=0)
00000324: popz
00000328: popenv 0x40FD128
0000032C: push.imm.e 154
00000330: pushenv 0x20FD164
00000334: push.imm.e 1
00000338: conv.i.v
0000033C: push.imm.e 0
00000340: conv.i.v
00000344: push.imm.e 1072
00000348: conv.i.v
0000034C: call action_sprite_set(argc=3)
00000354: popz
00000358: popenv 0x40FD140
0000035C: push.imm.e 1
00000360: conv.i.v
00000364: push.imm.e 0
00000368: conv.i.v
0000036C: push.imm.e 654
00000370: conv.i.v
00000374: call action_sprite_set(argc=3)
0000037C: popz
00000380: push.imm.e 0
00000384: conv.i.v
00000388: push.imm.e 60
0000038C: conv.i.v
00000390: call action_set_alarm(argc=2)
00000398: popz
0000039C: push.imm.e 156
000003A0: pushenv 0x20FD1BC
000003A4: push.imm.e 0
000003A8: pop.v.i selec
000003B0: popenv 0x40FD1B0
000003B4: push.imm.e 0
000003B8: conv.i.v
000003BC: push.imm.e 0
000003C0: conv.i.v
000003C4: push.builtin.v os_type
000003CC: call action_if_variable(argc=3)
000003D4: pop.v.v local.__b__
000003DC: push.local.v local.__b__
000003E4: conv.v.b
000003E8: bf 0x20FD4B4
000003EC: push.imm.e 156
000003F0: pushenv 0x20FD23C
000003F4: push.imm.e 4
000003F8: conv.i.v
000003FC: push.imm.e 5000
00000400: conv.i.v
00000404: push.v mon
0000040C: call action_if_variable(argc=3)
00000414: pop.v.v local.__b__
0000041C: push.local.v local.__b__
00000424: conv.v.b
00000428: bf 0x20FD23C
0000042C: b 0x20FD244
00000430: popenv 0x40FD200
00000434: b 0x20FD248
00000438: popenv 0x1CFD244
0000043C: push.local.v local.__b__
00000444: conv.v.b
00000448: bf 0x20FD4B4
0000044C: push.imm.e 156
00000450: pushenv 0x20FD29C
00000454: push.imm.e 4
00000458: conv.i.v
0000045C: push.imm.e 3000
00000460: conv.i.v
00000464: push.v oil
0000046C: call action_if_variable(argc=3)
00000474: pop.v.v local.__b__
0000047C: push.local.v local.__b__
00000484: conv.v.b
00000488: bf 0x20FD29C
0000048C: b 0x20FD2A4
00000490: popenv 0x40FD260
00000494: b 0x20FD2A8
00000498: popenv 0x1CFD2A4
0000049C: push.local.v local.__b__
000004A4: conv.v.b
000004A8: bf 0x20FD4B4
000004AC: push.imm.e 0
000004B0: conv.i.v
000004B4: push.imm.e 0
000004B8: conv.i.v
000004BC: push.v avata
000004C4: call action_if_variable(argc=3)
000004CC: pop.v.v local.__b__
000004D4: push.local.v local.__b__
000004DC: conv.v.b
000004E0: bf 0x20FD4B4
000004E4: push.imm.e 154
000004E8: pushenv 0x20FD304
000004EC: push.imm.e 4
000004F0: pop.v.i level
000004F8: popenv 0x40FD2F8
000004FC: push.imm.e 1
00000500: pop.v.i avata
00000508: push.imm.e 156
0000050C: pushenv 0x20FD35C
00000510: push.imm.e 1
00000514: conv.i.v
00000518: call action_set_relative(argc=1)
00000520: popz
00000524: push.v mon
0000052C: push.imm.e -5000
00000530: add.i.v
00000534: pop.v.v mon
0000053C: push.imm.e 0
00000540: conv.i.v
00000544: call action_set_relative(argc=1)
0000054C: popz
00000550: popenv 0x40FD31C
00000554: push.imm.e 156
00000558: pushenv 0x20FD3A8
0000055C: push.imm.e 1
00000560: conv.i.v
00000564: call action_set_relative(argc=1)
0000056C: popz
00000570: push.v oil
00000578: push.imm.e -3000
0000057C: add.i.v
00000580: pop.v.v oil
00000588: push.imm.e 0
0000058C: conv.i.v
00000590: call action_set_relative(argc=1)
00000598: popz
0000059C: popenv 0x40FD368
000005A0: push.imm.e 1
000005A4: conv.i.v
000005A8: call action_set_relative(argc=1)
000005B0: popz
000005B4: push.imm.e 0
000005B8: conv.i.v
000005BC: push.i 3989790
000005C4: conv.i.v
000005C8: push.imm.e 1
000005CC: conv.i.v
000005D0: push.imm.e -50
000005D4: conv.i.v
000005D8: push.imm.e 0
000005DC: conv.i.v
000005E0: push.imm.e 1
000005E4: conv.i.v
000005E8: call action_effect(argc=6)
000005F0: popz
000005F4: push.imm.e 0
000005F8: conv.i.v
000005FC: call action_set_relative(argc=1)
00000604: popz
00000608: push.imm.e 694
0000060C: pushenv 0x20FD428
00000610: call action_kill_object(argc=0)
00000618: popz
0000061C: popenv 0x40FD41C
00000620: push.imm.e 336
00000624: pushenv 0x20FD440
00000628: call action_kill_object(argc=0)
00000630: popz
00000634: popenv 0x40FD434
00000638: push.imm.e 154
0000063C: pushenv 0x20FD470
00000640: push.imm.e 1
00000644: conv.i.v
00000648: push.imm.e 0
0000064C: conv.i.v
00000650: push.imm.e 1072
00000654: conv.i.v
00000658: call action_sprite_set(argc=3)
00000660: popz
00000664: popenv 0x40FD44C
00000668: push.imm.e 1
0000066C: conv.i.v
00000670: push.imm.e 0
00000674: conv.i.v
00000678: push.imm.e 654
0000067C: conv.i.v
00000680: call action_sprite_set(argc=3)
00000688: popz
0000068C: push.imm.e 0
00000690: conv.i.v
00000694: push.imm.e 60
00000698: conv.i.v
0000069C: call action_set_alarm(argc=2)
000006A4: popz
000006A8: push.imm.e 0
000006AC: conv.i.v
000006B0: call action_set_relative(argc=1)
000006B8: popz