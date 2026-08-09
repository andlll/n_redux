// gml_Object_villa1_Alarm_4  locals=2 args=0 len=1304
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 4
00000018: conv.i.v
0000001C: push.imm.e 3000
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 2
00000034: conv.i.v
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 617
00000044: conv.i.v
00000048: call action_if_number(argc=3)
00000050: pop.v.v local.__b__
00000058: push.local.v local.__b__
00000060: conv.v.b
00000064: bf 0x20D2588
00000068: push.imm.e 156
0000006C: pushenv 0x20D2138
00000070: push.imm.e 4
00000074: conv.i.v
00000078: push.v pop
00000080: push.imm.e 100
00000084: add.i.v
00000088: push.v hap
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20D2138
000000B0: b 0x20D2140
000000B4: popenv 0x40D20F4
000000B8: b 0x20D2144
000000BC: popenv 0x1CD2140
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x20D2588
000000D0: push.imm.e 156
000000D4: pushenv 0x20D2198
000000D8: push.imm.e 2
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v ele
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20D2198
00000110: b 0x20D21A0
00000114: popenv 0x40D215C
00000118: b 0x20D21A4
0000011C: popenv 0x1CD21A0
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20D2588
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: push.v ava
00000148: call action_if_variable(argc=3)
00000150: pop.v.v local.__b__
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x20D2238
00000168: push.imm.e 1
0000016C: conv.i.v
00000170: call action_set_relative(argc=1)
00000178: popz
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 212
00000190: conv.i.v
00000194: call action_create_object(argc=3)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.imm.e 0
000001B8: conv.i.v
000001BC: push.imm.e 1
000001C0: conv.i.v
000001C4: push.v ava
000001CC: call action_if_variable(argc=3)
000001D4: pop.v.v local.__b__
000001DC: push.local.v local.__b__
000001E4: conv.v.b
000001E8: bf 0x20D22BC
000001EC: push.imm.e 1
000001F0: conv.i.v
000001F4: call action_set_relative(argc=1)
000001FC: popz
00000200: push.imm.e 0
00000204: conv.i.v
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e 213
00000214: conv.i.v
00000218: call action_create_object(argc=3)
00000220: popz
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: call action_set_relative(argc=1)
00000234: popz
00000238: push.imm.e 0
0000023C: conv.i.v
00000240: push.imm.e 2
00000244: conv.i.v
00000248: push.v ava
00000250: call action_if_variable(argc=3)
00000258: pop.v.v local.__b__
00000260: push.local.v local.__b__
00000268: conv.v.b
0000026C: bf 0x20D2340
00000270: push.imm.e 1
00000274: conv.i.v
00000278: call action_set_relative(argc=1)
00000280: popz
00000284: push.imm.e 0
00000288: conv.i.v
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: push.imm.e 214
00000298: conv.i.v
0000029C: call action_create_object(argc=3)
000002A4: popz
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: call action_set_relative(argc=1)
000002B8: popz
000002BC: push.imm.e 0
000002C0: conv.i.v
000002C4: push.imm.e 3
000002C8: conv.i.v
000002CC: push.v ava
000002D4: call action_if_variable(argc=3)
000002DC: pop.v.v local.__b__
000002E4: push.local.v local.__b__
000002EC: conv.v.b
000002F0: bf 0x20D23C4
000002F4: push.imm.e 1
000002F8: conv.i.v
000002FC: call action_set_relative(argc=1)
00000304: popz
00000308: push.imm.e 0
0000030C: conv.i.v
00000310: push.imm.e 0
00000314: conv.i.v
00000318: push.imm.e 215
0000031C: conv.i.v
00000320: call action_create_object(argc=3)
00000328: popz
0000032C: push.imm.e 0
00000330: conv.i.v
00000334: call action_set_relative(argc=1)
0000033C: popz
00000340: push.imm.e 0
00000344: conv.i.v
00000348: push.imm.e 4
0000034C: conv.i.v
00000350: push.v ava
00000358: call action_if_variable(argc=3)
00000360: pop.v.v local.__b__
00000368: push.local.v local.__b__
00000370: conv.v.b
00000374: bf 0x20D2448
00000378: push.imm.e 1
0000037C: conv.i.v
00000380: call action_set_relative(argc=1)
00000388: popz
0000038C: push.imm.e 0
00000390: conv.i.v
00000394: push.imm.e 0
00000398: conv.i.v
0000039C: push.imm.e 216
000003A0: conv.i.v
000003A4: call action_create_object(argc=3)
000003AC: popz
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz
000003C4: push.imm.e 4
000003C8: conv.i.v
000003CC: push.imm.e 5
000003D0: conv.i.v
000003D4: push.v ava
000003DC: call action_if_variable(argc=3)
000003E4: pop.v.v local.__b__
000003EC: push.local.v local.__b__
000003F4: conv.v.b
000003F8: bf 0x20D24CC
000003FC: push.imm.e 1
00000400: conv.i.v
00000404: call action_set_relative(argc=1)
0000040C: popz
00000410: push.imm.e 0
00000414: conv.i.v
00000418: push.imm.e 0
0000041C: conv.i.v
00000420: push.imm.e 211
00000424: conv.i.v
00000428: call action_create_object(argc=3)
00000430: popz
00000434: push.imm.e 0
00000438: conv.i.v
0000043C: call action_set_relative(argc=1)
00000444: popz
00000448: push.imm.e 2
0000044C: conv.i.v
00000450: push.imm.e 0
00000454: conv.i.v
00000458: push.imm.e 159
0000045C: conv.i.v
00000460: call action_if_number(argc=3)
00000468: pop.v.v local.__b__
00000470: push.local.v local.__b__
00000478: conv.v.b
0000047C: bf 0x20D2588
00000480: push.imm.e 2
00000484: conv.i.v
00000488: push.imm.e 0
0000048C: conv.i.v
00000490: push.imm.e 161
00000494: conv.i.v
00000498: call action_if_number(argc=3)
000004A0: pop.v.v local.__b__
000004A8: push.local.v local.__b__
000004B0: conv.v.b
000004B4: bf 0x20D2588
000004B8: push.imm.e 1
000004BC: conv.i.v
000004C0: call action_set_relative(argc=1)
000004C8: popz
000004CC: push.imm.e 0
000004D0: conv.i.v
000004D4: push.imm.e 0
000004D8: conv.i.v
000004DC: push.imm.e 212
000004E0: conv.i.v
000004E4: call action_create_object(argc=3)
000004EC: popz
000004F0: push.imm.e 0
000004F4: conv.i.v
000004F8: call action_set_relative(argc=1)
00000500: popz
00000504: push.imm.e 0
00000508: conv.i.v
0000050C: call action_set_relative(argc=1)
00000514: popz