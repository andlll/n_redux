// gml_Object_casa2_Alarm_4  locals=2 args=0 len=1108
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
00000064: bf 0x20D69A4
00000068: push.imm.e 156
0000006C: pushenv 0x20D6610
00000070: push.imm.e 4
00000074: conv.i.v
00000078: push.v pop
00000080: push.v hap
00000088: call action_if_variable(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x20D6610
000000A8: b 0x20D6618
000000AC: popenv 0x40D65D4
000000B0: b 0x20D661C
000000B4: popenv 0x1CD6618
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x20D69A4
000000C8: push.imm.e 156
000000CC: pushenv 0x20D6670
000000D0: push.imm.e 2
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.v ele
000000E8: call action_if_variable(argc=3)
000000F0: pop.v.v local.__b__
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x20D6670
00000108: b 0x20D6678
0000010C: popenv 0x40D6634
00000110: b 0x20D667C
00000114: popenv 0x1CD6678
00000118: push.local.v local.__b__
00000120: conv.v.b
00000124: bf 0x20D69A4
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.v ava
00000140: call action_if_variable(argc=3)
00000148: pop.v.v local.__b__
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x20D6710
00000160: push.imm.e 1
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 218
00000188: conv.i.v
0000018C: call action_create_object(argc=3)
00000194: popz
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: call action_set_relative(argc=1)
000001A8: popz
000001AC: push.imm.e 0
000001B0: conv.i.v
000001B4: push.imm.e 1
000001B8: conv.i.v
000001BC: push.v ava
000001C4: call action_if_variable(argc=3)
000001CC: pop.v.v local.__b__
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x20D6794
000001E4: push.imm.e 1
000001E8: conv.i.v
000001EC: call action_set_relative(argc=1)
000001F4: popz
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 0
00000204: conv.i.v
00000208: push.imm.e 219
0000020C: conv.i.v
00000210: call action_create_object(argc=3)
00000218: popz
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: call action_set_relative(argc=1)
0000022C: popz
00000230: push.imm.e 0
00000234: conv.i.v
00000238: push.imm.e 2
0000023C: conv.i.v
00000240: push.v ava
00000248: call action_if_variable(argc=3)
00000250: pop.v.v local.__b__
00000258: push.local.v local.__b__
00000260: conv.v.b
00000264: bf 0x20D6818
00000268: push.imm.e 1
0000026C: conv.i.v
00000270: call action_set_relative(argc=1)
00000278: popz
0000027C: push.imm.e 0
00000280: conv.i.v
00000284: push.imm.e 0
00000288: conv.i.v
0000028C: push.imm.e 220
00000290: conv.i.v
00000294: call action_create_object(argc=3)
0000029C: popz
000002A0: push.imm.e 0
000002A4: conv.i.v
000002A8: call action_set_relative(argc=1)
000002B0: popz
000002B4: push.imm.e 0
000002B8: conv.i.v
000002BC: push.imm.e 3
000002C0: conv.i.v
000002C4: push.v ava
000002CC: call action_if_variable(argc=3)
000002D4: pop.v.v local.__b__
000002DC: push.local.v local.__b__
000002E4: conv.v.b
000002E8: bf 0x20D689C
000002EC: push.imm.e 1
000002F0: conv.i.v
000002F4: call action_set_relative(argc=1)
000002FC: popz
00000300: push.imm.e 0
00000304: conv.i.v
00000308: push.imm.e 0
0000030C: conv.i.v
00000310: push.imm.e 263
00000314: conv.i.v
00000318: call action_create_object(argc=3)
00000320: popz
00000324: push.imm.e 0
00000328: conv.i.v
0000032C: call action_set_relative(argc=1)
00000334: popz
00000338: push.imm.e 0
0000033C: conv.i.v
00000340: push.imm.e 4
00000344: conv.i.v
00000348: push.v ava
00000350: call action_if_variable(argc=3)
00000358: pop.v.v local.__b__
00000360: push.local.v local.__b__
00000368: conv.v.b
0000036C: bf 0x20D6920
00000370: push.imm.e 1
00000374: conv.i.v
00000378: call action_set_relative(argc=1)
00000380: popz
00000384: push.imm.e 0
00000388: conv.i.v
0000038C: push.imm.e 0
00000390: conv.i.v
00000394: push.imm.e 264
00000398: conv.i.v
0000039C: call action_create_object(argc=3)
000003A4: popz
000003A8: push.imm.e 0
000003AC: conv.i.v
000003B0: call action_set_relative(argc=1)
000003B8: popz
000003BC: push.imm.e 4
000003C0: conv.i.v
000003C4: push.imm.e 5
000003C8: conv.i.v
000003CC: push.v ava
000003D4: call action_if_variable(argc=3)
000003DC: pop.v.v local.__b__
000003E4: push.local.v local.__b__
000003EC: conv.v.b
000003F0: bf 0x20D69A4
000003F4: push.imm.e 1
000003F8: conv.i.v
000003FC: call action_set_relative(argc=1)
00000404: popz
00000408: push.imm.e 0
0000040C: conv.i.v
00000410: push.imm.e 0
00000414: conv.i.v
00000418: push.imm.e 266
0000041C: conv.i.v
00000420: call action_create_object(argc=3)
00000428: popz
0000042C: push.imm.e 0
00000430: conv.i.v
00000434: call action_set_relative(argc=1)
0000043C: popz
00000440: push.imm.e 0
00000444: conv.i.v
00000448: call action_set_relative(argc=1)
00000450: popz