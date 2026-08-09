// gml_Object_m3cant_Create_0  locals=2 args=0 len=416
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x213F2EC
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x213F2EC
00000040: b 0x213F2F4
00000044: popenv 0x413F2B0
00000048: b 0x213F2F8
0000004C: popenv 0x1D3F2F4
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x213F328
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x213F36C
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x213F36C
000000C0: b 0x213F374
000000C4: popenv 0x413F330
000000C8: b 0x213F378
000000CC: popenv 0x1D3F374
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x213F3A8
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.imm.e 440
00000104: push.imm.e -1
00000108: push.imm.e 0
0000010C: pop.v.i obj0.alarm[array]
00000114: push.v y
0000011C: neg.v.d
00000120: push.imm.e 1
00000124: add.i.v
00000128: pop.v.v depth
00000130: push.imm.e 1
00000134: pop.v.i phase
0000013C: push.imm.e 0
00000140: pop.v.i redder
00000148: push.imm.e 484
0000014C: conv.i.v
00000150: push.v y
00000158: push.v x
00000160: push.imm.e 2
00000164: add.i.v
00000168: call instance_create(argc=3)
00000170: popz
00000174: push.imm.e 125
00000178: conv.i.v
0000017C: push.v y
00000184: push.imm.e 100
00000188: sub.i.v
0000018C: push.v x
00000194: call instance_create(argc=3)
0000019C: popz