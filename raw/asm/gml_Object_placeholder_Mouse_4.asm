// gml_Object_placeholder_Mouse_4  locals=2 args=0 len=1384
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 1
00000018: conv.i.v
0000001C: push.imm.e -1
00000020: push.imm.e 0
00000024: push.v obj0.view_yview[array]
0000002C: push.imm.e -1
00000030: push.imm.e 0
00000034: push.v obj0.view_hview[array]
0000003C: add.v.v
00000040: push.imm.e 100
00000044: sub.i.v
00000048: push.builtin.v mouse_y
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21DD894
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.v act
00000088: call action_if_variable(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x21DD894
000000A8: push.imm.e 156
000000AC: pushenv 0x21DD42C
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.imm.e 6
000000BC: conv.i.v
000000C0: push.v selec
000000C8: call action_if_variable(argc=3)
000000D0: pop.v.v local.__b__
000000D8: push.local.v local.__b__
000000E0: conv.v.b
000000E4: bf 0x21DD42C
000000E8: b 0x21DD434
000000EC: popenv 0x41DD3F0
000000F0: b 0x21DD438
000000F4: popenv 0x1DDD434
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x21DD63C
00000108: push.imm.e 156
0000010C: pushenv 0x21DD48C
00000110: push.imm.e 4
00000114: conv.i.v
00000118: push.imm.e 6000
0000011C: conv.i.v
00000120: push.v mon
00000128: call action_if_variable(argc=3)
00000130: pop.v.v local.__b__
00000138: push.local.v local.__b__
00000140: conv.v.b
00000144: bf 0x21DD48C
00000148: b 0x21DD494
0000014C: popenv 0x41DD450
00000150: b 0x21DD498
00000154: popenv 0x1DDD494
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x21DD63C
00000168: push.imm.e 1
0000016C: pop.v.i making
00000174: push.imm.e 142
00000178: pushenv 0x21DD4C8
0000017C: push.imm.e 0
00000180: pop.v.i goer
00000188: popenv 0x41DD4BC
0000018C: push.imm.e 1
00000190: conv.i.v
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: push.imm.e 1352
000001A0: conv.i.v
000001A4: call action_sprite_set(argc=3)
000001AC: popz
000001B0: push.imm.e 1
000001B4: conv.i.v
000001B8: push.imm.e 255
000001BC: conv.i.v
000001C0: call action_sprite_color(argc=2)
000001C8: popz
000001CC: push.imm.e 1
000001D0: conv.i.v
000001D4: call action_set_relative(argc=1)
000001DC: popz
000001E0: push.imm.e 57
000001E4: conv.i.v
000001E8: push.imm.e 99
000001EC: conv.i.v
000001F0: push.imm.e 596
000001F4: conv.i.v
000001F8: call action_create_object(argc=3)
00000200: popz
00000204: push.imm.e 0
00000208: conv.i.v
0000020C: call action_set_relative(argc=1)
00000214: popz
00000218: push.imm.e 1
0000021C: conv.i.v
00000220: call action_set_relative(argc=1)
00000228: popz
0000022C: push.imm.e -57
00000230: conv.i.v
00000234: push.imm.e 99
00000238: conv.i.v
0000023C: push.imm.e 597
00000240: conv.i.v
00000244: call action_create_object(argc=3)
0000024C: popz
00000250: push.imm.e 0
00000254: conv.i.v
00000258: call action_set_relative(argc=1)
00000260: popz
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz
00000278: push.imm.e -57
0000027C: conv.i.v
00000280: push.imm.e -99
00000284: conv.i.v
00000288: push.imm.e 598
0000028C: conv.i.v
00000290: call action_create_object(argc=3)
00000298: popz
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: call action_set_relative(argc=1)
000002AC: popz
000002B0: push.imm.e 1
000002B4: conv.i.v
000002B8: call action_set_relative(argc=1)
000002C0: popz
000002C4: push.imm.e 57
000002C8: conv.i.v
000002CC: push.imm.e -99
000002D0: conv.i.v
000002D4: push.imm.e 599
000002D8: conv.i.v
000002DC: call action_create_object(argc=3)
000002E4: popz
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: call action_set_relative(argc=1)
000002F8: popz
000002FC: push.imm.e 156
00000300: pushenv 0x21DD680
00000304: push.imm.e 0
00000308: conv.i.v
0000030C: push.imm.e 70
00000310: conv.i.v
00000314: push.v selec
0000031C: call action_if_variable(argc=3)
00000324: pop.v.v local.__b__
0000032C: push.local.v local.__b__
00000334: conv.v.b
00000338: bf 0x21DD680
0000033C: b 0x21DD688
00000340: popenv 0x41DD644
00000344: b 0x21DD68C
00000348: popenv 0x1DDD688
0000034C: push.local.v local.__b__
00000354: conv.v.b
00000358: bf 0x21DD894
0000035C: push.imm.e 156
00000360: pushenv 0x21DD6E4
00000364: push.imm.e 4
00000368: conv.i.v
0000036C: push.i 35000
00000374: conv.i.v
00000378: push.v mon
00000380: call action_if_variable(argc=3)
00000388: pop.v.v local.__b__
00000390: push.local.v local.__b__
00000398: conv.v.b
0000039C: bf 0x21DD6E4
000003A0: b 0x21DD6EC
000003A4: popenv 0x41DD6A4
000003A8: b 0x21DD6F0
000003AC: popenv 0x1DDD6EC
000003B0: push.local.v local.__b__
000003B8: conv.v.b
000003BC: bf 0x21DD894
000003C0: push.imm.e 1
000003C4: pop.v.i making
000003CC: push.imm.e 142
000003D0: pushenv 0x21DD720
000003D4: push.imm.e 0
000003D8: pop.v.i goer
000003E0: popenv 0x41DD714
000003E4: push.imm.e 1
000003E8: conv.i.v
000003EC: push.imm.e 0
000003F0: conv.i.v
000003F4: push.imm.e 1352
000003F8: conv.i.v
000003FC: call action_sprite_set(argc=3)
00000404: popz
00000408: push.imm.e 1
0000040C: conv.i.v
00000410: push.imm.e 255
00000414: conv.i.v
00000418: call action_sprite_color(argc=2)
00000420: popz
00000424: push.imm.e 1
00000428: conv.i.v
0000042C: call action_set_relative(argc=1)
00000434: popz
00000438: push.imm.e 57
0000043C: conv.i.v
00000440: push.imm.e 99
00000444: conv.i.v
00000448: push.imm.e 596
0000044C: conv.i.v
00000450: call action_create_object(argc=3)
00000458: popz
0000045C: push.imm.e 0
00000460: conv.i.v
00000464: call action_set_relative(argc=1)
0000046C: popz
00000470: push.imm.e 1
00000474: conv.i.v
00000478: call action_set_relative(argc=1)
00000480: popz
00000484: push.imm.e -57
00000488: conv.i.v
0000048C: push.imm.e 99
00000490: conv.i.v
00000494: push.imm.e 597
00000498: conv.i.v
0000049C: call action_create_object(argc=3)
000004A4: popz
000004A8: push.imm.e 0
000004AC: conv.i.v
000004B0: call action_set_relative(argc=1)
000004B8: popz
000004BC: push.imm.e 1
000004C0: conv.i.v
000004C4: call action_set_relative(argc=1)
000004CC: popz
000004D0: push.imm.e -57
000004D4: conv.i.v
000004D8: push.imm.e -99
000004DC: conv.i.v
000004E0: push.imm.e 598
000004E4: conv.i.v
000004E8: call action_create_object(argc=3)
000004F0: popz
000004F4: push.imm.e 0
000004F8: conv.i.v
000004FC: call action_set_relative(argc=1)
00000504: popz
00000508: push.imm.e 1
0000050C: conv.i.v
00000510: call action_set_relative(argc=1)
00000518: popz
0000051C: push.imm.e 57
00000520: conv.i.v
00000524: push.imm.e -99
00000528: conv.i.v
0000052C: push.imm.e 599
00000530: conv.i.v
00000534: call action_create_object(argc=3)
0000053C: popz
00000540: push.imm.e 0
00000544: conv.i.v
00000548: call action_set_relative(argc=1)
00000550: popz
00000554: push.imm.e 0
00000558: conv.i.v
0000055C: call action_set_relative(argc=1)
00000564: popz