// gml_Object_impa33f_Create_0  locals=2 args=0 len=404
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x214432C
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x214432C
00000054: b 0x2144334
00000058: popenv 0x41442F0
0000005C: b 0x2144338
00000060: popenv 0x1D44334
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2144368
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x21443AC
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x21443AC
000000D4: b 0x21443B4
000000D8: popenv 0x4144370
000000DC: b 0x21443B8
000000E0: popenv 0x1D443B4
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x21443E8
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.v y
0000011C: neg.v.d
00000120: push.imm.e 341
00000124: sub.i.v
00000128: pop.v.v depth
00000130: push.imm.e 240
00000134: push.imm.e -1
00000138: push.imm.e 0
0000013C: pop.v.i obj0.alarm[array]
00000144: push.imm.e 1
00000148: pop.v.i phase
00000150: push.imm.e 0
00000154: pop.v.i demos
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 492
00000170: conv.i.v
00000174: call action_create_object(argc=3)
0000017C: popz
00000180: push.imm.e 0
00000184: conv.i.v
00000188: call action_set_relative(argc=1)
00000190: popz