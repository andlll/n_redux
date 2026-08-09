// gml_Object_rocket_launcher_Mouse_4  locals=2 args=0 len=2048
// locals: arguments, __b__
00000000: push.imm.e 0
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
00000048: bf 0x20EF6A8
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
00000088: bf 0x20EF6A8
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: push.v launching
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20EF6A8
000000C4: push.imm.e 156
000000C8: pushenv 0x20EF11C
000000CC: push.imm.e 0
000000D0: pop.v.i selec
000000D8: popenv 0x40EF110
000000DC: push.imm.e 0
000000E0: pop.v.i launching
000000E8: push.imm.e 6
000000EC: conv.i.v
000000F0: push.imm.e 40
000000F4: conv.i.v
000000F8: call action_set_alarm(argc=2)
00000100: popz
00000104: push.imm.e 2
00000108: conv.i.v
0000010C: push.v x
00000114: push.imm.e 15
00000118: conv.i.v
0000011C: push.v y
00000124: push.v x
0000012C: call instance_nearest(argc=3)
00000134: conv.v.i
00000138: push.v [stacktop].x
00000140: call action_if_variable(argc=3)
00000148: pop.v.v local.__b__
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x20EF2A0
00000160: push.imm.e 2
00000164: conv.i.v
00000168: push.v y
00000170: push.imm.e 15
00000174: conv.i.v
00000178: push.v y
00000180: push.v x
00000188: call instance_nearest(argc=3)
00000190: conv.v.i
00000194: push.v [stacktop].y
0000019C: push.imm.e 93
000001A0: add.i.v
000001A4: call action_if_variable(argc=3)
000001AC: pop.v.v local.__b__
000001B4: push.local.v local.__b__
000001BC: conv.v.b
000001C0: bf 0x20EF2A0
000001C4: push.imm.e 1
000001C8: conv.i.v
000001CC: call action_set_relative(argc=1)
000001D4: popz
000001D8: push.imm.e -93
000001DC: conv.i.v
000001E0: push.imm.e 53
000001E4: conv.i.v
000001E8: push.imm.e 608
000001EC: conv.i.v
000001F0: call action_create_object(argc=3)
000001F8: popz
000001FC: push.imm.e 0
00000200: conv.i.v
00000204: call action_set_relative(argc=1)
0000020C: popz
00000210: push.imm.e 1
00000214: conv.i.v
00000218: call action_set_relative(argc=1)
00000220: popz
00000224: push.imm.e -93
00000228: conv.i.v
0000022C: push.imm.e 53
00000230: conv.i.v
00000234: push.imm.e 293
00000238: conv.i.v
0000023C: call action_create_object(argc=3)
00000244: popz
00000248: push.imm.e 0
0000024C: conv.i.v
00000250: call action_set_relative(argc=1)
00000258: popz
0000025C: push.imm.e 3
00000260: conv.i.v
00000264: push.v x
0000026C: push.imm.e 15
00000270: conv.i.v
00000274: push.v y
0000027C: push.v x
00000284: call instance_nearest(argc=3)
0000028C: conv.v.i
00000290: push.v [stacktop].x
00000298: call action_if_variable(argc=3)
000002A0: pop.v.v local.__b__
000002A8: push.local.v local.__b__
000002B0: conv.v.b
000002B4: bf 0x20EF3F8
000002B8: push.imm.e 2
000002BC: conv.i.v
000002C0: push.v y
000002C8: push.imm.e 15
000002CC: conv.i.v
000002D0: push.v y
000002D8: push.v x
000002E0: call instance_nearest(argc=3)
000002E8: conv.v.i
000002EC: push.v [stacktop].y
000002F4: push.imm.e 93
000002F8: add.i.v
000002FC: call action_if_variable(argc=3)
00000304: pop.v.v local.__b__
0000030C: push.local.v local.__b__
00000314: conv.v.b
00000318: bf 0x20EF3F8
0000031C: push.imm.e 1
00000320: conv.i.v
00000324: call action_set_relative(argc=1)
0000032C: popz
00000330: push.imm.e -70
00000334: conv.i.v
00000338: push.imm.e -13
0000033C: conv.i.v
00000340: push.imm.e 608
00000344: conv.i.v
00000348: call action_create_object(argc=3)
00000350: popz
00000354: push.imm.e 0
00000358: conv.i.v
0000035C: call action_set_relative(argc=1)
00000364: popz
00000368: push.imm.e 1
0000036C: conv.i.v
00000370: call action_set_relative(argc=1)
00000378: popz
0000037C: push.imm.e -70
00000380: conv.i.v
00000384: push.imm.e -13
00000388: conv.i.v
0000038C: push.imm.e 293
00000390: conv.i.v
00000394: call action_create_object(argc=3)
0000039C: popz
000003A0: push.imm.e 0
000003A4: conv.i.v
000003A8: call action_set_relative(argc=1)
000003B0: popz
000003B4: push.imm.e 2
000003B8: conv.i.v
000003BC: push.v x
000003C4: push.imm.e 15
000003C8: conv.i.v
000003CC: push.v y
000003D4: push.v x
000003DC: call instance_nearest(argc=3)
000003E4: conv.v.i
000003E8: push.v [stacktop].x
000003F0: call action_if_variable(argc=3)
000003F8: pop.v.v local.__b__
00000400: push.local.v local.__b__
00000408: conv.v.b
0000040C: bf 0x20EF550
00000410: push.imm.e 3
00000414: conv.i.v
00000418: push.v y
00000420: push.imm.e 15
00000424: conv.i.v
00000428: push.v y
00000430: push.v x
00000438: call instance_nearest(argc=3)
00000440: conv.v.i
00000444: push.v [stacktop].y
0000044C: push.imm.e 93
00000450: add.i.v
00000454: call action_if_variable(argc=3)
0000045C: pop.v.v local.__b__
00000464: push.local.v local.__b__
0000046C: conv.v.b
00000470: bf 0x20EF550
00000474: push.imm.e 1
00000478: conv.i.v
0000047C: call action_set_relative(argc=1)
00000484: popz
00000488: push.imm.e -110
0000048C: conv.i.v
00000490: push.imm.e 29
00000494: conv.i.v
00000498: push.imm.e 613
0000049C: conv.i.v
000004A0: call action_create_object(argc=3)
000004A8: popz
000004AC: push.imm.e 0
000004B0: conv.i.v
000004B4: call action_set_relative(argc=1)
000004BC: popz
000004C0: push.imm.e 1
000004C4: conv.i.v
000004C8: call action_set_relative(argc=1)
000004D0: popz
000004D4: push.imm.e -110
000004D8: conv.i.v
000004DC: push.imm.e 29
000004E0: conv.i.v
000004E4: push.imm.e 293
000004E8: conv.i.v
000004EC: call action_create_object(argc=3)
000004F4: popz
000004F8: push.imm.e 0
000004FC: conv.i.v
00000500: call action_set_relative(argc=1)
00000508: popz
0000050C: push.imm.e 3
00000510: conv.i.v
00000514: push.v x
0000051C: push.imm.e 15
00000520: conv.i.v
00000524: push.v y
0000052C: push.v x
00000534: call instance_nearest(argc=3)
0000053C: conv.v.i
00000540: push.v [stacktop].x
00000548: call action_if_variable(argc=3)
00000550: pop.v.v local.__b__
00000558: push.local.v local.__b__
00000560: conv.v.b
00000564: bf 0x20EF6A8
00000568: push.imm.e 3
0000056C: conv.i.v
00000570: push.v y
00000578: push.imm.e 15
0000057C: conv.i.v
00000580: push.v y
00000588: push.v x
00000590: call instance_nearest(argc=3)
00000598: conv.v.i
0000059C: push.v [stacktop].y
000005A4: push.imm.e 93
000005A8: add.i.v
000005AC: call action_if_variable(argc=3)
000005B4: pop.v.v local.__b__
000005BC: push.local.v local.__b__
000005C4: conv.v.b
000005C8: bf 0x20EF6A8
000005CC: push.imm.e 1
000005D0: conv.i.v
000005D4: call action_set_relative(argc=1)
000005DC: popz
000005E0: push.imm.e -116
000005E4: conv.i.v
000005E8: push.imm.e -12
000005EC: conv.i.v
000005F0: push.imm.e 293
000005F4: conv.i.v
000005F8: call action_create_object(argc=3)
00000600: popz
00000604: push.imm.e 0
00000608: conv.i.v
0000060C: call action_set_relative(argc=1)
00000614: popz
00000618: push.imm.e 1
0000061C: conv.i.v
00000620: call action_set_relative(argc=1)
00000628: popz
0000062C: push.imm.e -116
00000630: conv.i.v
00000634: push.imm.e -12
00000638: conv.i.v
0000063C: push.imm.e 613
00000640: conv.i.v
00000644: call action_create_object(argc=3)
0000064C: popz
00000650: push.imm.e 0
00000654: conv.i.v
00000658: call action_set_relative(argc=1)
00000660: popz
00000664: push.imm.e 156
00000668: pushenv 0x20EF6EC
0000066C: push.imm.e 0
00000670: conv.i.v
00000674: push.imm.e 11
00000678: conv.i.v
0000067C: push.v selec
00000684: call action_if_variable(argc=3)
0000068C: pop.v.v local.__b__
00000694: push.local.v local.__b__
0000069C: conv.v.b
000006A0: bf 0x20EF6EC
000006A4: b 0x20EF6F4
000006A8: popenv 0x40EF6B0
000006AC: b 0x20EF6F8
000006B0: popenv 0x1CEF6F4
000006B4: push.local.v local.__b__
000006BC: conv.v.b
000006C0: bf 0x20EF830
000006C4: push.imm.e 156
000006C8: pushenv 0x20EF74C
000006CC: push.imm.e 4
000006D0: conv.i.v
000006D4: push.imm.e 20000
000006D8: conv.i.v
000006DC: push.v mon
000006E4: call action_if_variable(argc=3)
000006EC: pop.v.v local.__b__
000006F4: push.local.v local.__b__
000006FC: conv.v.b
00000700: bf 0x20EF74C
00000704: b 0x20EF754
00000708: popenv 0x40EF710
0000070C: b 0x20EF758
00000710: popenv 0x1CEF754
00000714: push.local.v local.__b__
0000071C: conv.v.b
00000720: bf 0x20EF830
00000724: push.imm.e 0
00000728: conv.i.v
0000072C: push.imm.e 0
00000730: conv.i.v
00000734: push.imm.e 127
00000738: conv.i.v
0000073C: call action_if_number(argc=3)
00000744: pop.v.v local.__b__
0000074C: push.local.v local.__b__
00000754: conv.v.b
00000758: bf 0x20EF830
0000075C: push.imm.e 1
00000760: pop.v.i redder
00000768: push.imm.e 1
0000076C: conv.i.v
00000770: call action_set_relative(argc=1)
00000778: popz
0000077C: push.imm.e 0
00000780: conv.i.v
00000784: push.imm.e 0
00000788: conv.i.v
0000078C: push.imm.e 127
00000790: conv.i.v
00000794: call action_create_object(argc=3)
0000079C: popz
000007A0: push.imm.e 0
000007A4: conv.i.v
000007A8: call action_set_relative(argc=1)
000007B0: popz
000007B4: push.imm.e 9
000007B8: conv.i.v
000007BC: push.imm.e 2
000007C0: conv.i.v
000007C4: call action_set_alarm(argc=2)
000007CC: popz
000007D0: push.imm.e 1
000007D4: conv.i.v
000007D8: push.imm.e 255
000007DC: conv.i.v
000007E0: call action_sprite_color(argc=2)
000007E8: popz
000007EC: push.imm.e 0
000007F0: conv.i.v
000007F4: call action_set_relative(argc=1)
000007FC: popz