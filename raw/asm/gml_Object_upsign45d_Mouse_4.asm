// gml_Object_upsign45d_Mouse_4  locals=2 args=0 len=1300
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
00000048: bf 0x20FA33C
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20FA154
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
000000B4: push.imm.e 665
000000B8: conv.i.v
000000BC: call action_create_object(argc=3)
000000C4: popz
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: b 0x20FA33C
000000E0: push.imm.e 156
000000E4: pushenv 0x20FA198
000000E8: push.imm.e 4
000000EC: conv.i.v
000000F0: push.imm.e 20000
000000F4: conv.i.v
000000F8: push.v mon
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20FA198
00000120: b 0x20FA1A0
00000124: popenv 0x40FA15C
00000128: b 0x20FA1A4
0000012C: popenv 0x1CFA1A0
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20FA33C
00000140: push.imm.e 1
00000144: conv.i.v
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 1321
00000154: conv.i.v
00000158: call action_sprite_set(argc=3)
00000160: popz
00000164: push.imm.e 2
00000168: pop.v.i arm
00000170: push.imm.e 156
00000174: pushenv 0x20FA22C
00000178: push.imm.e 1
0000017C: conv.i.v
00000180: call action_set_relative(argc=1)
00000188: popz
0000018C: push.v mon
00000194: push.imm.e -20000
00000198: add.i.v
0000019C: pop.v.v mon
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: call action_set_relative(argc=1)
000001B4: popz
000001B8: popenv 0x40FA1EC
000001BC: push.imm.e 1
000001C0: conv.i.v
000001C4: call action_set_relative(argc=1)
000001CC: popz
000001D0: push.imm.e 0
000001D4: conv.i.v
000001D8: push.i 3989790
000001E0: conv.i.v
000001E4: push.imm.e 1
000001E8: conv.i.v
000001EC: push.imm.e -50
000001F0: conv.i.v
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: push.imm.e 1
00000200: conv.i.v
00000204: call action_effect(argc=6)
0000020C: popz
00000210: push.imm.e 0
00000214: conv.i.v
00000218: call action_set_relative(argc=1)
00000220: popz
00000224: push.imm.e 1
00000228: conv.i.v
0000022C: call action_set_relative(argc=1)
00000234: popz
00000238: push.imm.e 0
0000023C: conv.i.v
00000240: push.imm.e 0
00000244: conv.i.v
00000248: push.imm.e 252
0000024C: conv.i.v
00000250: call action_create_object(argc=3)
00000258: popz
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: call action_set_relative(argc=1)
0000026C: popz
00000270: push.imm.e 1
00000274: conv.i.v
00000278: call action_set_relative(argc=1)
00000280: popz
00000284: push.imm.e 0
00000288: conv.i.v
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: push.imm.e 547
00000298: conv.i.v
0000029C: call action_create_object(argc=3)
000002A4: popz
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: call action_set_relative(argc=1)
000002B8: popz
000002BC: call action_kill_object(argc=0)
000002C4: popz
000002C8: push.imm.e 156
000002CC: pushenv 0x20FA350
000002D0: push.imm.e 0
000002D4: pop.v.i selec
000002DC: popenv 0x40FA344
000002E0: push.imm.e 0
000002E4: conv.i.v
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: push.builtin.v os_type
000002F8: call action_if_variable(argc=3)
00000300: pop.v.v local.__b__
00000308: push.local.v local.__b__
00000310: conv.v.b
00000314: bf 0x20FA574
00000318: push.imm.e 156
0000031C: pushenv 0x20FA3D0
00000320: push.imm.e 4
00000324: conv.i.v
00000328: push.imm.e 20000
0000032C: conv.i.v
00000330: push.v mon
00000338: call action_if_variable(argc=3)
00000340: pop.v.v local.__b__
00000348: push.local.v local.__b__
00000350: conv.v.b
00000354: bf 0x20FA3D0
00000358: b 0x20FA3D8
0000035C: popenv 0x40FA394
00000360: b 0x20FA3DC
00000364: popenv 0x1CFA3D8
00000368: push.local.v local.__b__
00000370: conv.v.b
00000374: bf 0x20FA574
00000378: push.imm.e 1
0000037C: conv.i.v
00000380: push.imm.e 0
00000384: conv.i.v
00000388: push.imm.e 1321
0000038C: conv.i.v
00000390: call action_sprite_set(argc=3)
00000398: popz
0000039C: push.imm.e 2
000003A0: pop.v.i arm
000003A8: push.imm.e 156
000003AC: pushenv 0x20FA464
000003B0: push.imm.e 1
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz
000003C4: push.v mon
000003CC: push.imm.e -20000
000003D0: add.i.v
000003D4: pop.v.v mon
000003DC: push.imm.e 0
000003E0: conv.i.v
000003E4: call action_set_relative(argc=1)
000003EC: popz
000003F0: popenv 0x40FA424
000003F4: push.imm.e 1
000003F8: conv.i.v
000003FC: call action_set_relative(argc=1)
00000404: popz
00000408: push.imm.e 0
0000040C: conv.i.v
00000410: push.i 3989790
00000418: conv.i.v
0000041C: push.imm.e 1
00000420: conv.i.v
00000424: push.imm.e -50
00000428: conv.i.v
0000042C: push.imm.e 0
00000430: conv.i.v
00000434: push.imm.e 1
00000438: conv.i.v
0000043C: call action_effect(argc=6)
00000444: popz
00000448: push.imm.e 0
0000044C: conv.i.v
00000450: call action_set_relative(argc=1)
00000458: popz
0000045C: push.imm.e 1
00000460: conv.i.v
00000464: call action_set_relative(argc=1)
0000046C: popz
00000470: push.imm.e 0
00000474: conv.i.v
00000478: push.imm.e 0
0000047C: conv.i.v
00000480: push.imm.e 252
00000484: conv.i.v
00000488: call action_create_object(argc=3)
00000490: popz
00000494: push.imm.e 0
00000498: conv.i.v
0000049C: call action_set_relative(argc=1)
000004A4: popz
000004A8: push.imm.e 1
000004AC: conv.i.v
000004B0: call action_set_relative(argc=1)
000004B8: popz
000004BC: push.imm.e 0
000004C0: conv.i.v
000004C4: push.imm.e 0
000004C8: conv.i.v
000004CC: push.imm.e 547
000004D0: conv.i.v
000004D4: call action_create_object(argc=3)
000004DC: popz
000004E0: push.imm.e 0
000004E4: conv.i.v
000004E8: call action_set_relative(argc=1)
000004F0: popz
000004F4: call action_kill_object(argc=0)
000004FC: popz
00000500: push.imm.e 0
00000504: conv.i.v
00000508: call action_set_relative(argc=1)
00000510: popz