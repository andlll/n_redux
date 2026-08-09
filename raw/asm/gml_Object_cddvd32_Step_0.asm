// gml_Object_cddvd32_Step_0  locals=2 args=0 len=692
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x211A4E4
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x211A4E4
00000040: b 0x211A4EC
00000044: popenv 0x411A4A8
00000048: b 0x211A4F0
0000004C: popenv 0x1D1A4EC
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x211A5C8
00000060: push.imm.e 156
00000064: pushenv 0x211A544
00000068: push.imm.e 3
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x211A544
000000A0: b 0x211A54C
000000A4: popenv 0x411A508
000000A8: b 0x211A550
000000AC: popenv 0x1D1A54C
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x211A5C8
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x211A5C8
000000F8: push.imm.e 0
000000FC: pop.v.i bout
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 518
00000118: conv.i.v
0000011C: call action_sprite_set(argc=3)
00000124: popz
00000128: push.imm.e 455
0000012C: pushenv 0x211A60C
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: push.v night
00000148: call action_if_variable(argc=3)
00000150: pop.v.v local.__b__
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x211A60C
00000168: b 0x211A614
0000016C: popenv 0x411A5D0
00000170: b 0x211A618
00000174: popenv 0x1D1A614
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x211A688
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: push.imm.e 0
00000194: conv.i.v
00000198: push.v trans
000001A0: call action_if_variable(argc=3)
000001A8: pop.v.v local.__b__
000001B0: push.local.v local.__b__
000001B8: conv.v.b
000001BC: bf 0x211A688
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.imm.e 36
000001CC: conv.i.v
000001D0: call action_set_alarm(argc=2)
000001D8: popz
000001DC: push.imm.e 1
000001E0: pop.v.i trans
000001E8: push.imm.e 455
000001EC: pushenv 0x211A6CC
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.v night
00000208: call action_if_variable(argc=3)
00000210: pop.v.v local.__b__
00000218: push.local.v local.__b__
00000220: conv.v.b
00000224: bf 0x211A6CC
00000228: b 0x211A6D4
0000022C: popenv 0x411A690
00000230: b 0x211A6D8
00000234: popenv 0x1D1A6D4
00000238: push.local.v local.__b__
00000240: conv.v.b
00000244: bf 0x211A754
00000248: push.imm.e 0
0000024C: conv.i.v
00000250: push.imm.e 1
00000254: conv.i.v
00000258: push.v trans
00000260: call action_if_variable(argc=3)
00000268: pop.v.v local.__b__
00000270: push.local.v local.__b__
00000278: conv.v.b
0000027C: bf 0x211A754
00000280: push.imm.e 1
00000284: conv.i.v
00000288: push.imm.e 24
0000028C: conv.i.v
00000290: call action_set_alarm(argc=2)
00000298: popz
0000029C: push.imm.e 0
000002A0: pop.v.i bout
000002A8: push.imm.e 0
000002AC: pop.v.i trans