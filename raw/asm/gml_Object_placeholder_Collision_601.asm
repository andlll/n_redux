// gml_Object_placeholder_Collision_601  locals=2 args=0 len=1456
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: pop.v.i making
00000020: push.imm.e 601
00000024: pushenv 0x21DAA68
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 1
00000034: conv.i.v
00000038: push.v arm
00000040: call action_if_variable(argc=3)
00000048: pop.v.v local.__b__
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21DAA68
00000060: b 0x21DAA70
00000064: popenv 0x41DAA2C
00000068: b 0x21DAA74
0000006C: popenv 0x1DDAA70
00000070: push.local.v local.__b__
00000078: conv.v.b
0000007C: bf 0x21DAFA0
00000080: push.imm.e 156
00000084: pushenv 0x21DAAC8
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 6
00000094: conv.i.v
00000098: push.v selec
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x21DAAC8
000000C0: b 0x21DAAD0
000000C4: popenv 0x41DAA8C
000000C8: b 0x21DAAD4
000000CC: popenv 0x1DDAAD0
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x21DAD10
000000E0: push.v other.id
000000E8: conv.v.i
000000EC: pushenv 0x21DAB40
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 680
00000108: conv.i.v
0000010C: push.imm.e -1559
00000110: conv.i.v
00000114: push.imm.e 122
00000118: conv.i.v
0000011C: call action_create_object(argc=3)
00000124: popz
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: call action_set_relative(argc=1)
00000138: popz
0000013C: popenv 0x41DAAF4
00000140: push.imm.e 1
00000144: conv.i.v
00000148: call action_set_relative(argc=1)
00000150: popz
00000154: push.imm.e 680
00000158: conv.i.v
0000015C: push.imm.e -1559
00000160: conv.i.v
00000164: push.imm.e 122
00000168: conv.i.v
0000016C: call action_create_object(argc=3)
00000174: popz
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: call action_set_relative(argc=1)
00000188: popz
0000018C: push.imm.e 1
00000190: conv.i.v
00000194: call action_set_relative(argc=1)
0000019C: popz
000001A0: push.imm.e 57
000001A4: conv.i.v
000001A8: push.imm.e -99
000001AC: conv.i.v
000001B0: push.imm.e 548
000001B4: conv.i.v
000001B8: call action_create_object(argc=3)
000001C0: popz
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: call action_set_relative(argc=1)
000001D4: popz
000001D8: push.imm.e 1
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.imm.e 57
000001F0: conv.i.v
000001F4: push.imm.e -99
000001F8: conv.i.v
000001FC: push.imm.e 604
00000200: conv.i.v
00000204: call action_create_object(argc=3)
0000020C: popz
00000210: push.imm.e 0
00000214: conv.i.v
00000218: call action_set_relative(argc=1)
00000220: popz
00000224: push.imm.e 156
00000228: pushenv 0x21DAC70
0000022C: push.imm.e 1
00000230: conv.i.v
00000234: call action_set_relative(argc=1)
0000023C: popz
00000240: push.v mon
00000248: push.imm.e -6000
0000024C: add.i.v
00000250: pop.v.v mon
00000258: push.imm.e 0
0000025C: conv.i.v
00000260: call action_set_relative(argc=1)
00000268: popz
0000026C: popenv 0x41DAC30
00000270: push.imm.e 142
00000274: pushenv 0x21DAC88
00000278: push.imm.e 1
0000027C: pop.v.i goer
00000284: popenv 0x41DAC7C
00000288: push.imm.e 616
0000028C: pushenv 0x21DACA0
00000290: push.imm.e 0
00000294: pop.v.i ult
0000029C: popenv 0x41DAC94
000002A0: call action_kill_object(argc=0)
000002A8: popz
000002AC: push.imm.e 600
000002B0: pushenv 0x21DACC4
000002B4: call action_kill_object(argc=0)
000002BC: popz
000002C0: popenv 0x41DACB8
000002C4: push.imm.e 601
000002C8: pushenv 0x21DACDC
000002CC: call action_kill_object(argc=0)
000002D4: popz
000002D8: popenv 0x41DACD0
000002DC: push.imm.e 602
000002E0: pushenv 0x21DACF4
000002E4: call action_kill_object(argc=0)
000002EC: popz
000002F0: popenv 0x41DACE8
000002F4: push.imm.e 603
000002F8: pushenv 0x21DAD0C
000002FC: call action_kill_object(argc=0)
00000304: popz
00000308: popenv 0x41DAD00
0000030C: push.imm.e 156
00000310: pushenv 0x21DAD54
00000314: push.imm.e 0
00000318: conv.i.v
0000031C: push.imm.e 70
00000320: conv.i.v
00000324: push.v selec
0000032C: call action_if_variable(argc=3)
00000334: pop.v.v local.__b__
0000033C: push.local.v local.__b__
00000344: conv.v.b
00000348: bf 0x21DAD54
0000034C: b 0x21DAD5C
00000350: popenv 0x41DAD18
00000354: b 0x21DAD60
00000358: popenv 0x1DDAD5C
0000035C: push.local.v local.__b__
00000364: conv.v.b
00000368: bf 0x21DAFA0
0000036C: push.v other.id
00000374: conv.v.i
00000378: pushenv 0x21DADCC
0000037C: push.imm.e 1
00000380: conv.i.v
00000384: call action_set_relative(argc=1)
0000038C: popz
00000390: push.imm.e 680
00000394: conv.i.v
00000398: push.imm.e -1559
0000039C: conv.i.v
000003A0: push.imm.e 123
000003A4: conv.i.v
000003A8: call action_create_object(argc=3)
000003B0: popz
000003B4: push.imm.e 0
000003B8: conv.i.v
000003BC: call action_set_relative(argc=1)
000003C4: popz
000003C8: popenv 0x41DAD80
000003CC: push.imm.e 1
000003D0: conv.i.v
000003D4: call action_set_relative(argc=1)
000003DC: popz
000003E0: push.imm.e 680
000003E4: conv.i.v
000003E8: push.imm.e -1559
000003EC: conv.i.v
000003F0: push.imm.e 123
000003F4: conv.i.v
000003F8: call action_create_object(argc=3)
00000400: popz
00000404: push.imm.e 0
00000408: conv.i.v
0000040C: call action_set_relative(argc=1)
00000414: popz
00000418: push.imm.e 1
0000041C: conv.i.v
00000420: call action_set_relative(argc=1)
00000428: popz
0000042C: push.imm.e 57
00000430: conv.i.v
00000434: push.imm.e -99
00000438: conv.i.v
0000043C: push.imm.e 543
00000440: conv.i.v
00000444: call action_create_object(argc=3)
0000044C: popz
00000450: push.imm.e 0
00000454: conv.i.v
00000458: call action_set_relative(argc=1)
00000460: popz
00000464: push.imm.e 1
00000468: conv.i.v
0000046C: call action_set_relative(argc=1)
00000474: popz
00000478: push.imm.e 57
0000047C: conv.i.v
00000480: push.imm.e -99
00000484: conv.i.v
00000488: push.imm.e 604
0000048C: conv.i.v
00000490: call action_create_object(argc=3)
00000498: popz
0000049C: push.imm.e 0
000004A0: conv.i.v
000004A4: call action_set_relative(argc=1)
000004AC: popz
000004B0: push.imm.e 156
000004B4: pushenv 0x21DAF00
000004B8: push.imm.e 1
000004BC: conv.i.v
000004C0: call action_set_relative(argc=1)
000004C8: popz
000004CC: push.v mon
000004D4: push.i -35000
000004DC: add.i.v
000004E0: pop.v.v mon
000004E8: push.imm.e 0
000004EC: conv.i.v
000004F0: call action_set_relative(argc=1)
000004F8: popz
000004FC: popenv 0x41DAEBC
00000500: push.imm.e 142
00000504: pushenv 0x21DAF18
00000508: push.imm.e 1
0000050C: pop.v.i goer
00000514: popenv 0x41DAF0C
00000518: push.imm.e 616
0000051C: pushenv 0x21DAF30
00000520: push.imm.e 0
00000524: pop.v.i ult
0000052C: popenv 0x41DAF24
00000530: call action_kill_object(argc=0)
00000538: popz
0000053C: push.imm.e 600
00000540: pushenv 0x21DAF54
00000544: call action_kill_object(argc=0)
0000054C: popz
00000550: popenv 0x41DAF48
00000554: push.imm.e 601
00000558: pushenv 0x21DAF6C
0000055C: call action_kill_object(argc=0)
00000564: popz
00000568: popenv 0x41DAF60
0000056C: push.imm.e 602
00000570: pushenv 0x21DAF84
00000574: call action_kill_object(argc=0)
0000057C: popz
00000580: popenv 0x41DAF78
00000584: push.imm.e 603
00000588: pushenv 0x21DAF9C
0000058C: call action_kill_object(argc=0)
00000594: popz
00000598: popenv 0x41DAF90
0000059C: push.imm.e 0
000005A0: conv.i.v
000005A4: call action_set_relative(argc=1)
000005AC: popz