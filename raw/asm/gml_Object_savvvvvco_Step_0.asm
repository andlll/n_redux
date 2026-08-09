// gml_Object_savvvvvco_Step_0  locals=2 args=0 len=716
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 156
00000030: pushenv 0x213BB2C
00000034: push.imm.e 3
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.v crys
0000004C: call action_if_variable(argc=3)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: bf 0x213BB2C
0000006C: b 0x213BB34
00000070: popenv 0x413BAF0
00000074: b 0x213BB38
00000078: popenv 0x1D3BB34
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x213BC08
0000008C: push.imm.e 156
00000090: pushenv 0x213BB8C
00000094: push.imm.e 3
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.v biotech
000000AC: call action_if_variable(argc=3)
000000B4: pop.v.v local.__b__
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x213BB8C
000000CC: b 0x213BB94
000000D0: popenv 0x413BB50
000000D4: b 0x213BB98
000000D8: popenv 0x1D3BB94
000000DC: push.local.v local.__b__
000000E4: conv.v.b
000000E8: bf 0x213BC08
000000EC: push.imm.e -1
000000F0: push.imm.e 0
000000F4: push.v obj0.view_yview[array]
000000FC: push.imm.e 60
00000100: push.global.v global.sca
00000108: mul.v.i
0000010C: add.v.v
00000110: push.global.v global.upp
00000118: add.v.v
0000011C: push.imm.e -1
00000120: push.imm.e 0
00000124: push.v obj0.view_xview[array]
0000012C: push.imm.e 10
00000130: push.global.v global.sca
00000138: mul.v.i
0000013C: add.v.v
00000140: call action_move_to(argc=2)
00000148: popz
0000014C: push.imm.e 156
00000150: pushenv 0x213BC4C
00000154: push.imm.e 2
00000158: conv.i.v
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: push.v biotech
0000016C: call action_if_variable(argc=3)
00000174: pop.v.v local.__b__
0000017C: push.local.v local.__b__
00000184: conv.v.b
00000188: bf 0x213BC4C
0000018C: b 0x213BC54
00000190: popenv 0x413BC10
00000194: b 0x213BC58
00000198: popenv 0x1D3BC54
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: bf 0x213BCC8
000001AC: push.imm.e -1
000001B0: push.imm.e 0
000001B4: push.v obj0.view_yview[array]
000001BC: push.imm.e 120
000001C0: push.global.v global.sca
000001C8: mul.v.i
000001CC: add.v.v
000001D0: push.global.v global.upp
000001D8: add.v.v
000001DC: push.imm.e -1
000001E0: push.imm.e 0
000001E4: push.v obj0.view_xview[array]
000001EC: push.imm.e 10
000001F0: push.global.v global.sca
000001F8: mul.v.i
000001FC: add.v.v
00000200: call action_move_to(argc=2)
00000208: popz
0000020C: push.imm.e 156
00000210: pushenv 0x213BD0C
00000214: push.imm.e 2
00000218: conv.i.v
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.v crys
0000022C: call action_if_variable(argc=3)
00000234: pop.v.v local.__b__
0000023C: push.local.v local.__b__
00000244: conv.v.b
00000248: bf 0x213BD0C
0000024C: b 0x213BD14
00000250: popenv 0x413BCD0
00000254: b 0x213BD18
00000258: popenv 0x1D3BD14
0000025C: push.local.v local.__b__
00000264: conv.v.b
00000268: bf 0x213BD88
0000026C: push.imm.e -1
00000270: push.imm.e 0
00000274: push.v obj0.view_yview[array]
0000027C: push.imm.e 120
00000280: push.global.v global.sca
00000288: mul.v.i
0000028C: add.v.v
00000290: push.global.v global.upp
00000298: add.v.v
0000029C: push.imm.e -1
000002A0: push.imm.e 0
000002A4: push.v obj0.view_xview[array]
000002AC: push.imm.e 10
000002B0: push.global.v global.sca
000002B8: mul.v.i
000002BC: add.v.v
000002C0: call action_move_to(argc=2)
000002C8: popz