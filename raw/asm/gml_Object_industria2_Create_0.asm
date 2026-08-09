// gml_Object_industria2_Create_0  locals=2 args=0 len=1336
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 0
00000024: pop.v.i makee
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: call action_set_relative(argc=1)
0000003C: popz
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 236
00000054: conv.i.v
00000058: call action_create_object(argc=3)
00000060: popz
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: call action_set_relative(argc=1)
00000074: popz
00000078: push.imm.e 455
0000007C: pushenv 0x20EB6B8
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 1
0000008C: conv.i.v
00000090: push.v night
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20EB6B8
000000B8: b 0x20EB6C0
000000BC: popenv 0x40EB67C
000000C0: b 0x20EB6C4
000000C4: popenv 0x1CEB6C0
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20EB6F4
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.i 16366009
000000E8: conv.i.v
000000EC: call action_sprite_color(argc=2)
000000F4: popz
000000F8: push.imm.e 455
000000FC: pushenv 0x20EB738
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.v dawn
00000118: call action_if_variable(argc=3)
00000120: pop.v.v local.__b__
00000128: push.local.v local.__b__
00000130: conv.v.b
00000134: bf 0x20EB738
00000138: b 0x20EB740
0000013C: popenv 0x40EB6FC
00000140: b 0x20EB744
00000144: popenv 0x1CEB740
00000148: push.local.v local.__b__
00000150: conv.v.b
00000154: bf 0x20EB774
00000158: push.imm.e 1
0000015C: conv.i.v
00000160: push.i 15201023
00000168: conv.i.v
0000016C: call action_sprite_color(argc=2)
00000174: popz
00000178: push.imm.e 156
0000017C: pushenv 0x20EB7BC
00000180: push.imm.e 1
00000184: conv.i.v
00000188: call action_set_relative(argc=1)
00000190: popz
00000194: push.v wewe
0000019C: push.imm.e 60
000001A0: add.i.v
000001A4: pop.v.v wewe
000001AC: push.imm.e 0
000001B0: conv.i.v
000001B4: call action_set_relative(argc=1)
000001BC: popz
000001C0: popenv 0x40EB77C
000001C4: push.imm.e 100
000001C8: pop.v.i life
000001D0: push.imm.e 156
000001D4: pushenv 0x20EB814
000001D8: push.imm.e 1
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.v hap
000001F4: push.imm.e -100
000001F8: add.i.v
000001FC: pop.v.v hap
00000204: push.imm.e 0
00000208: conv.i.v
0000020C: call action_set_relative(argc=1)
00000214: popz
00000218: popenv 0x40EB7D4
0000021C: push.imm.e 2
00000220: conv.i.v
00000224: push.imm.e 120
00000228: conv.i.v
0000022C: call action_set_alarm(argc=2)
00000234: popz
00000238: push.imm.e 5
0000023C: conv.i.v
00000240: push.imm.e 34
00000244: conv.i.v
00000248: call action_set_alarm(argc=2)
00000250: popz
00000254: push.imm.e 0
00000258: pop.v.i arp
00000260: push.imm.e 0
00000264: pop.v.i deming
0000026C: push.imm.e 0
00000270: pop.v.i upo
00000278: push.imm.e 3
0000027C: conv.i.v
00000280: push.imm.e 60
00000284: conv.i.v
00000288: call action_set_alarm(argc=2)
00000290: popz
00000294: push.imm.e 4
00000298: conv.i.v
0000029C: push.imm.e 73
000002A0: conv.i.v
000002A4: call action_set_alarm(argc=2)
000002AC: popz
000002B0: push.v y
000002B8: neg.v.d
000002BC: pop.v.v depth
000002C4: push.imm.e 2
000002C8: conv.i.v
000002CC: call action_if_dice(argc=1)
000002D4: pop.v.v local.__b__
000002DC: push.local.v local.__b__
000002E4: conv.v.b
000002E8: bf 0x20EBA18
000002EC: push.imm.e 1
000002F0: conv.i.v
000002F4: push.imm.e 0
000002F8: conv.i.v
000002FC: push.imm.e 995
00000300: conv.i.v
00000304: call action_sprite_set(argc=3)
0000030C: popz
00000310: push.imm.e 2
00000314: pop.v.i xi
0000031C: push.imm.e 1
00000320: conv.i.v
00000324: call action_set_relative(argc=1)
0000032C: popz
00000330: push.imm.e 0
00000334: conv.i.v
00000338: push.imm.e 0
0000033C: conv.i.v
00000340: push.imm.e 320
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
0000037C: push.imm.e 0
00000380: conv.i.v
00000384: push.imm.e 0
00000388: conv.i.v
0000038C: push.imm.e 329
00000390: conv.i.v
00000394: call action_create_object(argc=3)
0000039C: popz
000003A0: push.imm.e 0
000003A4: conv.i.v
000003A8: call action_set_relative(argc=1)
000003B0: popz
000003B4: push.imm.e 1
000003B8: conv.i.v
000003BC: call action_set_relative(argc=1)
000003C4: popz
000003C8: push.imm.e 0
000003CC: conv.i.v
000003D0: push.imm.e 0
000003D4: conv.i.v
000003D8: push.imm.e 330
000003DC: conv.i.v
000003E0: call action_create_object(argc=3)
000003E8: popz
000003EC: push.imm.e 0
000003F0: conv.i.v
000003F4: call action_set_relative(argc=1)
000003FC: popz
00000400: push.imm.e 0
00000404: conv.i.v
00000408: call action_set_relative(argc=1)
00000410: popz
00000414: exit
00000418: b 0x20EBB20
0000041C: push.imm.e 1
00000420: pop.v.i xi
00000428: push.imm.e 1
0000042C: conv.i.v
00000430: call action_set_relative(argc=1)
00000438: popz
0000043C: push.imm.e 0
00000440: conv.i.v
00000444: push.imm.e 0
00000448: conv.i.v
0000044C: push.imm.e 319
00000450: conv.i.v
00000454: call action_create_object(argc=3)
0000045C: popz
00000460: push.imm.e 0
00000464: conv.i.v
00000468: call action_set_relative(argc=1)
00000470: popz
00000474: push.imm.e 1
00000478: conv.i.v
0000047C: call action_set_relative(argc=1)
00000484: popz
00000488: push.imm.e 0
0000048C: conv.i.v
00000490: push.imm.e 0
00000494: conv.i.v
00000498: push.imm.e 327
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
000004D4: push.imm.e 0
000004D8: conv.i.v
000004DC: push.imm.e 0
000004E0: conv.i.v
000004E4: push.imm.e 328
000004E8: conv.i.v
000004EC: call action_create_object(argc=3)
000004F4: popz
000004F8: push.imm.e 0
000004FC: conv.i.v
00000500: call action_set_relative(argc=1)
00000508: popz
0000050C: push.imm.e 0
00000510: conv.i.v
00000514: call action_set_relative(argc=1)
0000051C: popz
00000520: exit
00000524: push.imm.e 0
00000528: conv.i.v
0000052C: call action_set_relative(argc=1)
00000534: popz